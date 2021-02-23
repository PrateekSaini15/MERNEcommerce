import { ADD_PRODUCT_TO_CART, CLEAR_CART } from "./actionTypes";
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

export const placeOrder = () => async (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const res = await axios.post("/api/user/order/add");
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    console.log(error);
  }
};
