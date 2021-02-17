import { ADD_PRODUCT_TO_CART } from "../actions/actionTypes";

const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, items: action.payload };
    default:
      return state;
  }
}
