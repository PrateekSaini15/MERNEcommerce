import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import categoryReducer from "./categoryReducers";
import adminReducer from "./adminAuthReducers";
import productReducer from "./productReducers";

export default combineReducers({
  auth: authReducer,
  admin: adminReducer,
  category: categoryReducer,
  product: productReducer,
  error: errorReducer,
});
