import { GET_PRODUCT_INVENTORY } from "./actionTypes";
import axios from "../axios";

axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "adminToken"
)}`;

export const getProductInventory = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/merchant/inventory/get/${productId}`);
    return dispatch({
      type: GET_PRODUCT_INVENTORY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
