import { ADD_PRODUCT } from "./actionTypes";
import axios from "../axios";

export const addProduct = (product) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios
    .post("/api/product/create", product)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
};
