import {
  SIGN_IN_MODAL_ON,
  SIGN_UP_MODAL_ON,
  MODAL_OFF,
  SIGN_OUT_MODAL_ON,
  LOG_OUT_MODAL_ON,
} from "../actions/actionTypes";

const initialState = {
  isSigninModal: false,
  isLogoutModal: false,
  isSignupModal: false,
  isSignoutModal: false,
};

const modalReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN_MODAL_ON:
      state = { ...prevState, isSigninModal: true };
      break;
    case SIGN_UP_MODAL_ON:
      state = { ...prevState, isSignupModal: true };
      break;
    case SIGN_OUT_MODAL_ON:
      state = { ...prevState, isSignoutModal: true };
      break;
    case LOG_OUT_MODAL_ON:
      state = { ...prevState, isLogoutModal: true };
      break;
    case MODAL_OFF:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default modalReducer;
