import { Dispatch } from "redux";
import { GET_ALL_PRODUCTS } from "../ActionTypes";
import axios from "axios";
import { getAllProductRoute } from "../../Api/ApiRoutes";

export const getAllProducts = () => async (dispatch: Dispatch) => {
  await axios
    .get(getAllProductRoute())
    .then((res) => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
    })
    .catch((error) => console.log("product err", error));
};
