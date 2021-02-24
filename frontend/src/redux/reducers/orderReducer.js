import { GET_ORDER_HISTORY, CANCEL_ORDER } from "../actions/actionTypes";

const initialState = {
  orders: [],
  rerender: false,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return { ...state, orders: action.payload };
    case CANCEL_ORDER:
      state = cancelOrder(state, action.payload);
      return { ...state, rerender: !state.rerender };
    default:
      return state;
  }
}

function cancelOrder(state, updatedOrder) {
  let orders = state.orders;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i]._id === updatedOrder._id) {
      orders[i] = updatedOrder;
    }
  }
  return { ...state, orders: orders };
}

export default orderReducer;
