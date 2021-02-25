import {
  LOGIN_MERCHANT_USER,
  LOGOUT_MERCHANT_USER,
  LOGIN_ERROR,
} from "./actionTypes";
import axios from "../axios";

export const loginMerchant = (loginDetails) => (dispatch) => {
  axios
    .post("/api/merchant/signin", { ...loginDetails })
    .then((res) => res.data.token.split(" ")[1])
    .then((token) => {
      localStorage.setItem("merchantToken", token);
      dispatch({ type: LOGIN_MERCHANT_USER, payload: token });
    })
    .catch((error) =>
      dispatch({ type: LOGIN_ERROR, payload: error.response.data })
    );
};

export const isLoggedin = () => (dispatch) => {
  const token = localStorage.getItem("merchantToken");
  if (token) {
    dispatch({ type: LOGIN_MERCHANT_USER, payload: token });
  }
};

export const logoutMerchant = () => (dispatch) => {
  localStorage.removeItem("merchantToken");
  dispatch({ type: LOGOUT_MERCHANT_USER });
};
