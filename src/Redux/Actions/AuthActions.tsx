// import api from "../../Api";
import {
  RESET_STATE,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTRATION_SUCCESS,
} from "../ActionTypes";
import { Dispatch } from "redux";
import { loginRoute, registerRoute } from "../../Api/ApiRoutes";
import api from "../../Api";

export const userRegister = (userData: any) => async (dispatch: Dispatch) => {
  await api
    .post(registerRoute(), userData)
    .then(({ data }) => {
      dispatch({
        type: USER_REGISTER,
        payload: USER_REGISTRATION_SUCCESS,
      });
    })
    .catch((error) =>
      dispatch({ type: USER_LOGIN_FAILED, payload: error.response })
    );
};

export const userLogin = (userData: any) => async (dispatch: Dispatch) => {
  let status;
  await api
    .post(loginRoute(), userData)
    .then(({ data }) => {
      const accessTkn = data.data.token;
      const refreshTkn = data.data.refreshToken;
      dispatch({ type: USER_LOGIN, payload: data });
      status = data.data._id;
      localStorage.setItem("accessToken", accessTkn);
      localStorage.setItem("refreshToken", refreshTkn);
    })
    .catch((error) =>
      dispatch({ type: USER_LOGIN_FAILED, payload: error.response })
    );
  return status;
};

export const userLogout = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("logout err", err);
  }
};

export const loginReset = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: RESET_STATE });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("login reset err", err);
  }
};
