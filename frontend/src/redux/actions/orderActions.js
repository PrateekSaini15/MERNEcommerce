import { GET_ORDER_HISTORY, CANCEL_ORDER } from "./actionTypes";
import { getAxiosInstance } from "../axios";

const axios = getAxiosInstance("user");

export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/order/get");
    dispatch({ type: GET_ORDER_HISTORY, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/order/cancel", { orderId });
    dispatch({ type: CANCEL_ORDER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
