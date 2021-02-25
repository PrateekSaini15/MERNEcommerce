import { LOGIN_ADMIN } from "../actions/actionTypes";
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
