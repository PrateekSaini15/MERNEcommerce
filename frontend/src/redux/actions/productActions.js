import { ADD_PRODUCT, GET_PRODUCTS_FOR_ADMIN } from "./actionTypes";
import axios from "../axios";

export const addProduct = (product) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios
    .post("/api/product/create", product)
    .then((res) => dispatch({ type: ADD_PRODUCT, payload: res.data }))
    .catch((error) => console.log(error));
};

export const getProductsForAdmin = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;

  axios
    .get("/api/product/get")
    .then((res) =>
      dispatch({ type: GET_PRODUCTS_FOR_ADMIN, payload: res.data })
    )
    .catch((error) => console.log(error));
};
