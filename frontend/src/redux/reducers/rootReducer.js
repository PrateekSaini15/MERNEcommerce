import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import categoryReducer from "./categoryReducers";
import adminReducer from "./adminAuthReducers";
import productReducer from "./productReducers";
import userProductReducer from "./userProductReducers";

export default combineReducers({
  auth: authReducer,
  admin: adminReducer,
  category: categoryReducer,
  product: productReducer,
  userProduct: userProductReducer,
  error: errorReducer,
});
