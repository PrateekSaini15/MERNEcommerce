import { GET_PRODUCT_INVENTORY } from "../actions/actionTypes";

const initialState = {
  entries: [],
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_INVENTORY:
      return { ...state, entries: action.payload };
    default:
      return state;
  }
}
