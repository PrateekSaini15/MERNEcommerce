import { CREATE_CATEGORY, FETCH_CATEGORIES } from "../actions/actionTypes";

const initialState = {
  categoryList: [],
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categoryList: action.payload };
    case CREATE_CATEGORY:
      return state;
    default:
      return state;
  }
}
