import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS_FOR_ADMIN,
  GET_PRODUCTS_FOR_USER,
  UPDATE_PRODUCT,
} from "./actionTypes";
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
  ] = `Bearer ${localStorage.getItem("adminToken")}`;

  axios
    .get("/api/product/get")
    .then((res) =>
      dispatch({ type: GET_PRODUCTS_FOR_ADMIN, payload: res.data })
    )
    .catch((error) => console.log(error));
};

export const deleteProduct = (productId) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;

  axios
    .delete(`/api/product/delete/${productId}`)
    .then((res) =>
      res.data.deletedCount
        ? dispatch({ type: DELETE_PRODUCT, payload: productId })
        : console.log("not deleted")
    )
    .catch((error) => console.log(error));
};

export const updateProduct = (product) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;

  axios
    .patch("api/product/update", product)
    .then((res) => dispatch({ type: UPDATE_PRODUCT, payload: res.data }))
    .catch((error) => console.log(error));
};
