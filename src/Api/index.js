import axios from "axios";

const getLocalAccessToken = () => {
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
      console.log("token", token);
      config.headers["x-access-token"] = token;
    }
  }
});

api.interceptors.response.use((res) => {});

export default api;
