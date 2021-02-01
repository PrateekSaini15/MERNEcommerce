import {
  LOGIN_ADMIN_USER,
  LOGOUT_ADMIN_USER,
  LOGIN_ERROR,
} from "./actionTypes";
import axios from "../axios";

export const loginAdmin = (loginDetails) => (dispatch) => {
  axios
    .post("/api/admin/signin", { ...loginDetails })
    .then((res) => res.data.token.split(" ")[1])
    .then((token) => {
      localStorage.setItem("adminToken", token);
      dispatch({ type: LOGIN_ADMIN_USER, payload: token });
    })
    .catch((error) =>
      dispatch({ type: LOGIN_ERROR, payload: error.response.data })
    );
};

export const isLoggedin = () => (dispatch) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    dispatch({ type: LOGIN_ADMIN_USER, payload: token });
  }
};

export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem("adminToken");
  dispatch({ type: LOGOUT_ADMIN_USER });
};
