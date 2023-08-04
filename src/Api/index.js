import axios from "axios";
import { refreshRoute } from "./ApiRoutes";

export const getLocalAccessToken = () => {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
};

const getLocalRefreshToken = () => {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config) {
    const token = getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => { return response},
  async (error) => {
    const originalRequest = error.config;
    // Check if the request received a 401 Unauthorized response
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post(refreshRoute(), {
          refreshToken: getLocalRefreshToken(),
        });

        const newAccessToken = response.data.data;
        originalRequest.headers["x-access-token"] = newAccessToken;
        localStorage.setItem("accessToken", newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        console.log("refreshError", refreshError);
      }
    }

    throw error;
  }
);

export default api;
