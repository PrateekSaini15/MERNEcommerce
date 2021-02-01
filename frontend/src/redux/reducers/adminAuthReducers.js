import { LOGIN_ADMIN_USER, LOGOUT_ADMIN_USER } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: {},
  loading: true,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isAuthenticating: false,
      };
    case LOGOUT_ADMIN_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isAuthenticating: false,
      };
    default:
      return state;
  }
}
