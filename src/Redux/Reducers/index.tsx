import { combineReducers } from "redux";
import Authentication from "./Auth";
import Products from "./Products";

export const rootReducer = combineReducers({ Authentication, Products });
