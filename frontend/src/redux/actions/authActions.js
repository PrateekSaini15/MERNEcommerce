import { SET_CURRENT_USER } from "./actionTypes";

export const loginUser = () => (dispatch) => {
  dispatch({ type: SET_CURRENT_USER });
};
