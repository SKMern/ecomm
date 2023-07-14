export type Pages = {
  component: React.JSX.Element;
  path: string;
  isAuthenticated: boolean;
};

export interface AuthenticateState {
  isLoggedIn: boolean;
  _id: string;
  address: string;
  country: string;
  eMail: string;
  name: string;
  password: string;
  pincode: number;
  refreshToken: string;
  secAnswer: string;
  secQuestion: string;
  state: string;
  token: string;
  userName: string;
  message: string;
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
  loader?: boolean;
  loginStatus?: "";
}

export interface RegisterState extends LoginState {
  [key: string]: any;
  email: string;
  name: string;
  popup?: boolean;
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
