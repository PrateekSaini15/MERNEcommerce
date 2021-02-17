import { ADD_PRODUCT_TO_CART } from "./actionTypes";
import axios from "../axios";

export const addToCart = (item) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios
    .post("/api/cart/add", {
      item: {
        productId: item._id,
        productName: item.name,
        price: item.price,
        quantity: 1,
      },
    })
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_TO_CART, payload: res.data.cartItems });
    })
    .catch((error) => console.log(error));
};

export const getCart = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios
    .get("/api/cart/get")
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_TO_CART, payload: res.data.cartItems });
    })
    .catch((error) => console.log(error));
};

export const clearCart = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios
    .get("/api/cart/clear")
    .then((res) =>
      dispatch({ type: ADD_PRODUCT_TO_CART, payload: res.data.cartItems })
    )
    .catch((error) => console.log(error));
};

export const removeItem = (item) => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  axios
    .post("/api/cart/delete", { item: { productId: item.productId } })
    .then((res) =>
      dispatch({ type: ADD_PRODUCT_TO_CART, payload: res.data.cartItems })
    )
    .catch((error) => console.log(error));
};
