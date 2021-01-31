import { SET_CURRENT_USER, LOGOUT_CURRENT_USER } from "./actionTypes";
import axios from "../axios";

export const loginUser = (loginDetails) => (dispatch) => {
  axios
    .post("/api/signin", { ...loginDetails })
    .then((res) => res.data.token.split(" ")[1])
    .then((token) => {
      localStorage.setItem("token", token);
      dispatch({ type: SET_CURRENT_USER, payload: token });
    })
    .catch((error) => console.log(error));
};

export const isLoggedin = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch({ type: SET_CURRENT_USER, payload: token });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT_CURRENT_USER });
};
