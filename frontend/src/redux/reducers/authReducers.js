import {
  SET_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  USER_SIGNUP_ERROR,
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
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isAuthenticating: false,
      };
    case LOGOUT_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isAuthenticating: false,
      };
    case USER_SIGNUP_ERROR:
      return {
        ...state,
        errors: { ...action.payload },
      };
    default:
      return state;
  }
}
