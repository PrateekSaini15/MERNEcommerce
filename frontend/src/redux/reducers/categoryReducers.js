import { FETCH_CATEGORIES } from "../actions/actionTypes";

const initialState = {};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log("Inside the category reducer");
      return state;
    default:
      return state;
  }
}
