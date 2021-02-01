import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import categoryReducer from "./categoryReducers";

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  error: errorReducer,
});
