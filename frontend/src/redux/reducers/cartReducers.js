import { ADD_PRODUCT_TO_CART, CLEAR_CART } from "../actions/actionTypes";

const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, items: action.payload };
    case CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
}
