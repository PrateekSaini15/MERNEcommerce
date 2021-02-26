import { GET_MERCHANT_ORDERS } from "./actionTypes";
import { getAxiosInstance } from "../axios";

export const getMerchantOrders = () => async (dispatch) => {
  try {
    const axios = getAxiosInstance("merchant");
    const res = await axios.get("/api/merchant/orders/get");
    dispatch({ type: GET_MERCHANT_ORDERS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
