import {
  LOGIN_MERCHANT_USER,
  LOGOUT_MERCHANT_USER,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: {},
  loading: true,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_MERCHANT_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isAuthenticating: false,
      };
    case LOGOUT_MERCHANT_USER:
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
