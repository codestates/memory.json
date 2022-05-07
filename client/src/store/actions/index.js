import {
  SIGN_IN,
  LOG_OUT,
  SIGN_UP,
  SIGN_OUT,
  USER_INFORMATION,
  SIGN_IN_MODAL_ON,
  LOG_OUT_MODAL_ON,
  SIGN_UP_MODAL_ON,
  SIGN_IN_ON_SIGN_UP_OFF_MODAL,
  SIGN_UP_ON_SIGN_IN_OFF_MODAL,
  SIGN_OUT_MODAL_ON,
  MODAL_OFF,
} from "./actionTypes";

export const signinAction = {
  type: SIGN_IN,
};
export const logoutAction = {
  type: LOG_OUT,
};
export const signupAction = {
  type: SIGN_UP,
};
export const signoutAction = {
  type: SIGN_OUT,
};
export const userInfoAction = (data) => ({
  type: USER_INFORMATION,
  payload: {
    ...data,
  },
});
export const signinModalOnAction = {
  type: SIGN_IN_MODAL_ON,
};
export const logoutModalOnAction = {
  type: LOG_OUT_MODAL_ON,
};
export const signupModalOnAction = {
  type: SIGN_UP_MODAL_ON,
};
export const changeSignupToSignin = {
  type: SIGN_IN_ON_SIGN_UP_OFF_MODAL,
};
export const changeSigninToSignup = {
  type: SIGN_UP_ON_SIGN_IN_OFF_MODAL,
};
export const signoutModalAction = {
  type: SIGN_OUT_MODAL_ON,
};
export const modalOff = {
  type: MODAL_OFF,
};
