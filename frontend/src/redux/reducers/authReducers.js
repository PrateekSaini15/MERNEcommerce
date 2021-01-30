import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, isAuthenticated: true };
    default:
      return state;
  }
};
