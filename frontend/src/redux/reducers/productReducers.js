import { ADD_PRODUCT } from "../actions/actionTypes";

const initialState = {};

export function porductReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state;
    default:
      return state;
  }
}
