import { FETCH_CATEGORIES, CREATE_CATEGORY, LOGIN_ERROR } from "./actionTypes";

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

export const createCategory = (newCategory) => (dispatch) => {
  if (newCategory.parentId === "root") {
    delete newCategory.parentId;
  }
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("adminToken")}`;
  axios
    .post("/api/category/create", { ...newCategory })
    .then((res) => dispatch({ type: CREATE_CATEGORY, payload: res.data }))
    .catch((error) =>
      dispatch({ type: LOGIN_ERROR, payload: error.response.data })
    );
};
