import { FETCH_CATEGORIES } from "./actionTypes";

export const fetchCategories = () => (dispatch) => {
  console.log("fetching categories");
  dispatch({ type: FETCH_CATEGORIES });
};
