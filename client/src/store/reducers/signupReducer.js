import { SIGN_UP } from "../actions/actionTypes";

const initialState = {
  signup: false,
};

const signupReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGN_UP:
      state = {
        ...prevState,
        signup: true,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default signupReducer;
