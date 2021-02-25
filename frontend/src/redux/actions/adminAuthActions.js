import { LOGIN_ADMIN, LOGOUT_ADMIN } from "../actions/actionTypes";
import { getAxiosInstance } from "../axios";
const axios = getAxiosInstance();
export const loginAdmin = (loginDetails) => async (dispatch) => {
  try {
    const res = await axios.post("/api/admin/signin", loginDetails);
    const token = res.data.token.split(" ")[1];
    localStorage.setItem("adminToken", token);
    dispatch({ type: LOGIN_ADMIN, payload: token });
  } catch (error) {
    console.log(error);
  }
};

export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem("adminToken");
  dispatch({ type: LOGOUT_ADMIN });
};

export const isLoggedIn = () => (dispatch) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    dispatch({ type: LOGIN_ADMIN, payload: token });
  }
};
