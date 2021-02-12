import { ADD_PRODUCT, GET_PRODUCTS_FOR_ADMIN } from "../actions/actionTypes";

const initialState = {
  products: [],
};

export default function porductReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state;
    case GET_PRODUCTS_FOR_ADMIN:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
