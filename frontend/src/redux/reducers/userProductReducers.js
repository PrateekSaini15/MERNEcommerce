import { GET_PRODUCTS_FOR_USER } from "../actions/actionTypes";

const initialState = {
  products: [],
};

export default function userProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_FOR_USER:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
