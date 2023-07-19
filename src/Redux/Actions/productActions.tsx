import { Dispatch } from "redux";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  PRODUCT_DELETE_SUCCESS,
  RESET_STATE,
  SET_LOADER,
  UPDATE_PRODUCT,
} from "../ActionTypes";
import {
  addProductRoute,
  deleteProductRoute,
  getAllProductRoute,
  updateProductRoute,
} from "../../Api/ApiRoutes";
import api from "../../Api";

export const getAllProducts = () => async (dispatch: Dispatch) => {
  await api
    .get(getAllProductRoute())
    .then((res) => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    })
    .catch((error) => console.log("product err", error));
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
  console.log("data", data);
  await api
    .patch(updateProductRoute(data._id), data)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: ADD_PRODUCT_SUCCESS,
      });
    })
    .catch((error) => console.log("product add 1err", error));
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
    .catch((error) => console.log("product add err", error));
};

export const reset = () => async (dispatch: Dispatch) => {
  dispatch({ type: RESET_STATE });
};

export const setReduxLoader = () => async (dispatch: Dispatch) => {
  dispatch({ type: SET_LOADER });
};