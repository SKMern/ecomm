const API_URL = process.env.REACT_APP_API_BASE_URL;

export const refreshRoute = () => {
  return `${API_URL}api/v1/user/refresh`;
};

export const loginRoute = () => {
  return `${API_URL}api/v1/user/login`;
};
export const registerRoute = () => {
  return `${API_URL}api/v1/user/register`;
};
export const getAllProductRoute = () => {
  return `${API_URL}api/getAll`;
};

export const addProductRoute = () => {
  return `${API_URL}api/post`;
};
export const updateProductRoute = (id: string) => {
  return `${API_URL}api/update/${id}`;
};
export const deleteProductRoute = (id: string) => {
  return `${API_URL}api/delete/${id}`;
};
