import { Action, AuthenticateState } from "../../Types";
import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER,
} from "../ActionTypes";

const initialState: AuthenticateState = {
  isLoggedIn: false,
  _id: "",
  address: "",
  country: "",
  eMail: "",
  name: "",
  password: "",
  pincode: 0,
  refreshToken: "",
  secAnswer: "",
  secQuestion: "",
  state: "",
  token: "",
  userName: "",
  message: "",
};

const Authentication = (
  state: AuthenticateState = initialState,
  action: Action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER:
      return {
        ...state,
        message: payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        ...payload.data,
        isLoggedIn: true,
        message: payload.message,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        message: payload.data.message,
      };

    case USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default Authentication;
