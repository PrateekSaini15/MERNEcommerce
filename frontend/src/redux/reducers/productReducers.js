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
      let products = this.state.products;
      products.push(action.payload);
      return { ...state, proudcts: products };
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
      state = updateProduct(state, action.payload);
      return state;
    default:
      return state;
  }
}

function updateProduct(state, product) {
  let products = state.products;
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === product._id) {
      products[i] = product;
    }
  }
  return { ...state, products: products };
}
