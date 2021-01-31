import { LOGIN_ERROR } from "../actions/actionTypes";

const initialState = {
  loginError: {
    email: "",
    password: "",
  },
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: { ...state.loginError, ...action.payload },
      };

    default:
      return state;
  }
}
