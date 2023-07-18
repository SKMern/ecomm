import { Dispatch } from "redux";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  PRODUCT_DELETE_SUCCESS,
  RESET_STATE,
  UPDATE_PRODUCT,
} from "../ActionTypes";
// import axios from "axios";
import {
  addProductRoute,
  deleteProductRoute,
  getAllProductRoute,
  updateProductRoute,
} from "../../Api/ApiRoutes";
import api from '../../Api'

const accessToken = window.localStorage.getItem("accessToken");
api.defaults.headers.common["x-access-token"] = accessToken;

export const getAllProducts = () => async (dispatch: Dispatch) => {
  await api
    .get(getAllProductRoute())
    .then((res) => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    })
    .catch((error) => console.log("get product err", error));
};

export const addProduct = (data: any) => async (dispatch: Dispatch) => {
  await api
    .post(addProductRoute(), data)
    .then(({ data }) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: ADD_PRODUCT_SUCCESS,
      });
    })
    .catch((error) => console.log("product add err", error));
};

export const updateProduct = (data: any) => async (dispatch: Dispatch) => {
  await api
    .patch(updateProductRoute(data._id), data)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: ADD_PRODUCT_SUCCESS,
      });
    })
    .catch((error) => console.log("product update err", error));
};

export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  await api
    .delete(deleteProductRoute(id))
    .then(({ data }) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: PRODUCT_DELETE_SUCCESS,
      });
    })
    .catch((error) => console.log("product delete err", error));
};

export const reset = () => async (dispatch: Dispatch) => {
  dispatch({ type: RESET_STATE });
};
