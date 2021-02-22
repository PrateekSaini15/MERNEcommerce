import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import categoryReducer from "./categoryReducers";
import adminReducer from "./adminAuthReducers";
import productReducer from "./productReducers";
import userProductReducer from "./userProductReducers";
import cartReducer from "./cartReducers";
import inventoryReducer from "./inventoryReducer";
export default combineReducers({
  auth: authReducer,
  admin: adminReducer,
  category: categoryReducer,
  product: productReducer,
  inventory: inventoryReducer,
  userProduct: userProductReducer,
  cart: cartReducer,
  error: errorReducer,
});
