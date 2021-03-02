import {
  LOGIN_MERCHANT_USER,
  LOGOUT_MERCHANT_USER,
  MERCHANT_SIGNUP_ERROR,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: {},
  loading: true,
  token: null,
  errors: {},
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
    case MERCHANT_SIGNUP_ERROR:
      return {
        ...state,
        errors: { ...action.payload },
      };
    default:
      return state;
  }
}
