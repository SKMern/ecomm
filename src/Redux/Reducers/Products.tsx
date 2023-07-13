import { Action, ProductsState } from "../../Types";
import { GET_ALL_PRODUCTS } from "../ActionTypes";

const initialState: ProductsState = {
  status: false,
  products: [],
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

    default:
      return state;
  }
};

export default Products;
