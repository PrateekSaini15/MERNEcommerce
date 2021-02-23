import { GET_ORDER_HISTORY } from "./actionTypes";
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
