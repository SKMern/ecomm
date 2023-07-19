import { Action, ProductsState } from "../../Types";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  RESET_STATE,
  SET_LOADER,
  UPDATE_PRODUCT,
} from "../ActionTypes";

const initialState: ProductsState = {
  products: [],
  addMessage: "",
  loader: true
};

const Products = (state: ProductsState = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        loader: false,
        products: [...payload],
      };
    case ADD_PRODUCT:
      return {
        ...state,
        loader: true,
        addMessage: payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        loader: true,
        addMessage: payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loader: true,
        addMessage: payload,
      };
    case RESET_STATE:
      return {
        ...state,
        addMessage: "",
      };
    case SET_LOADER: 
    return {
      ...state, loader: true
    }
    default:
      return state;
  }
};

export default Products;
