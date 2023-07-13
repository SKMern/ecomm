import { JsxElement } from "typescript";

export type Pages = {
  component: React.JSX.Element;
  path: string;
  isAuthenticated: boolean;
};

export interface AuthenticateState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface Action {
  type: string;
  payload: any;
}

export interface ReduxState {
  Authentication: AuthenticateState;
}

export interface LoginState {
  userName: string;
  password: string;
  showpassword?: boolean;
}

export interface RegisterState extends LoginState {
  [key: string]: any;
  email: string;
}

export interface RegisterInput {
  name: string;
  label: string;
}

export interface ProductsData {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export type ProductsState = {
  status: boolean;
  products: ProductsData[];
};
