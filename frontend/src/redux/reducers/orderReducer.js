import { GET_ORDER_HISTORY } from "../actions/actionTypes";

const initialState = {
  orders: [],
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

export default orderReducer;
