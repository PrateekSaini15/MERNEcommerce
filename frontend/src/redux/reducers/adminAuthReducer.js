import { LOGIN_ADMIN, LOGOUT_ADMIN } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  token: null,
};

export default function adminAuthReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return { ...state, isAuthenticated: true, token: action.payload };
    case LOGOUT_ADMIN:
      return { ...state, isAuthenticated: false, token: null };
    default:
      return state;
  }
}
