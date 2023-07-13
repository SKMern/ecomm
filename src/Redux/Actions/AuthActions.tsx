// import api from "../../Api";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../ActionTypes";
import { Dispatch } from "redux";

export const userRegister = (userData: any) => async (dispatch: Dispatch) => {
  try {
    console.log("userData", userData);
    dispatch({ type: USER_REGISTER });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("err", err);
  }
};

export const userLogin = (userData: any) => async (dispatch: Dispatch) => {
  try {
    console.log("userData", userData);
    dispatch({ type: USER_LOGIN });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("err", err);
  }
};
export const userLogout = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("err", err);
  }
};
