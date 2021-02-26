import { GET_MERCHANT_ORDERS } from "../actions/actionTypes";

const initialState = {
  orders: [],
};

export default function merchantOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MERCHANT_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}
