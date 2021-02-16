import { ADD_PRODUCT_TO_CART } from "./actionTypes";

export const addToCart = (item) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_TO_CART, payload: item });
};
