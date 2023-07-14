const API_URL = process.env.REACT_APP_API_BASE_URL;

export const loginRoute = () => {
  return `${API_URL}api/v1/user/login`;
};
export const registerRoute = () => {
  return `${API_URL}api/v1/user/register`;
};
export const getAllProductRoute = () => {
  return `${API_URL}api/getAll`;
};
