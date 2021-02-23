import { GET_PRODUCT_INVENTORY, ADD_ENTRY_TO_INVENTORY } from "./actionTypes";
import axios from "../axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
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

export const addEntryToInventory = (entry) => async (dispatch) => {
  try {
    const res = await axios.post("/api/merchant/inventory/add", entry);
    dispatch({ type: ADD_ENTRY_TO_INVENTORY, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
