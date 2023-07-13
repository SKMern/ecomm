import api from "../../Api";
import { Dispatch } from "redux";
import { GET_ALL_PRODUCTS } from "../ActionTypes";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllProducts = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${API_URL}api/getAll`);
    if (response.data)
      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
  } catch (err) {
    // Dispatch an error action with the error message
    console.log("products err", err);
  }
};
