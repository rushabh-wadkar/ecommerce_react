import { combineReducers } from "redux";
import productReducer from "./productlist.reducer";

const rootReducer = combineReducers({
  product_list: productReducer,
});

export default rootReducer;
