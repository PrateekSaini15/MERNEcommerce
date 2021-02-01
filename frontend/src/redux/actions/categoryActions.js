import { FETCH_CATEGORIES, CREATE_CATEGORY } from "./actionTypes";

import axios from "../axios";

export const fetchCategories = () => (dispatch) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios
    .get("/api/category/get")
    .then((res) => dispatch({ type: FETCH_CATEGORIES, payload: res.data }))
    .catch((error) => console.log(error));
};

export const createCategory = () => (dispatch) => {
  console.log("Creating a category");
};
