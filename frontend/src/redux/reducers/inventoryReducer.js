import {
  GET_PRODUCT_INVENTORY,
  ADD_ENTRY_TO_INVENTORY,
} from "../actions/actionTypes";

const initialState = {
  entries: [],
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_INVENTORY:
      return { ...state, entries: action.payload };
    case ADD_ENTRY_TO_INVENTORY:
      return { ...state, entries: [...state.entries, action.payload] };
    default:
      return state;
  }
}
