import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS_FOR_ADMIN,
  UPDATE_PRODUCT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
};

export default function porductReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state;
    case GET_PRODUCTS_FOR_ADMIN:
      return { ...state, products: action.payload };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case UPDATE_PRODUCT:
      return state;
    default:
      return state;
  }
}
