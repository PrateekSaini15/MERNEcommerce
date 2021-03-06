import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS_FOR_MERCHANT,
  GET_PRODUCTS_FOR_USER,
  UPDATE_PRODUCT,
} from "./actionTypes";
import axios from "../axios";

export const addProduct = (product) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("merchantToken")}`;
  axios
    .post("/api/product/create", product)
    .then((res) => {
      dispatch({ type: ADD_PRODUCT, payload: res.data.product });
    })
    .catch((error) => console.log(error));
};

export const getallProducts = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  axios
    .get("/api/user/product/getall")
    .then((res) => dispatch({ type: GET_PRODUCTS_FOR_USER, payload: res.data }))
    .catch((error) => console.log(error));
};

export const getProductsForAdmin = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("merchantToken")}`;

  axios
    .get("/api/product/get")
    .then((res) =>
      dispatch({ type: GET_PRODUCTS_FOR_MERCHANT, payload: res.data })
    )
    .catch((error) => console.log(error));
};

export const deleteProduct = (productId) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("merchantToken")}`;

  axios
    .delete(`/api/product/delete/${productId}`)
    .then((res) =>
      res.data.product.deletedCount
        ? dispatch({ type: DELETE_PRODUCT, payload: productId })
        : console.log("not deleted")
    )
    .catch((error) => console.log(error));
};

export const updateProduct = (product) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("merchantToken")}`;

  axios
    .patch("api/product/update", product)
    .then((res) => dispatch({ type: UPDATE_PRODUCT, payload: res.data }))
    .catch((error) => console.log(error));
};
