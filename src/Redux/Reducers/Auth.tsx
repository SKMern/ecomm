import { Action, AuthenticateState } from "../../Types";
import { USER_LOGIN, USER_LOGOUT } from "../ActionTypes";

const initialState: AuthenticateState = {
  isLoggedIn: false,
  accessToken: "",
  refreshToken: "",
};

const Authentication = (
  state: AuthenticateState = initialState,
  action: Action
) => {
  const { type } = action;

  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
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
