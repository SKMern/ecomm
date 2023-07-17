import { Action, ProductsState } from "../../Types";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  RESET_STATE,
  UPDATE_PRODUCT,
} from "../ActionTypes";

const initialState: ProductsState = {
  status: false,
  products: [],
  addMessage: "",
};

const Products = (state: ProductsState = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        status: true,
        products: [...payload],
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addMessage: payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        addMessage: payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        addMessage: payload,
      };
    case RESET_STATE:
      return {
        ...state,
        addMessage: "",
      };
    default:
      return state;
  }
};

export default Products;
