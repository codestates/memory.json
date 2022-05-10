import {
  SIGN_IN,
  LOG_OUT,
  SIGN_UP,
  SIGN_OUT,
  GET_USER,
  GOOGLE_LOGIN,
  KAKAO_LOGIN,
  USER_INFORMATION,
  SIGN_IN_MODAL_ON,
  LOG_OUT_MODAL_ON,
  SIGN_UP_MODAL_ON,
  SIGN_IN_ON_SIGN_UP_OFF_MODAL,
  SIGN_UP_ON_SIGN_IN_OFF_MODAL,
  SIGN_OUT_MODAL_ON,
  MY_PAGE_MODAL_ON,
  EDIT_MY_INFO_MODAL_ON,
  EDIT_MY_INFO_ON_MY_PAGE_OFF_MODAL,
  MY_PAGE_ON_EDIT_MY_INFO_OFF_MODAL,
  MY_HISTORY_MODAL_ON,
  MY_HISTORY_ON_MY_PAGE_OFF_MODAL,
  MY_FAVORITE_MODAL_ON,
  MY_FAVORITE_ON_MY_PAGE_OFF_MODAL,
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
export const getUserAction = (user_account, password) => ({
  type: GET_USER,
  data: { user_account: user_account, password: password },
});
export const googleAction = {
  type: GOOGLE_LOGIN,
};
export const kakaoAction = {
  type: KAKAO_LOGIN,
};
export const userinfoAction = (
  address,
  age,
  email,
  id,
  mobile,
  provider,
  sex,
  social_id,
  user_account,
  user_name
) => ({
  type: USER_INFORMATION,
  data: {
    address: address,
    age: age,
    email: email,
    id: id,
    mobile: mobile,
    provider: provider,
    sex: sex,
    social_id: social_id,
    user_account: user_account,
    user_name: user_name,
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
export const mypageModalAction = {
  type: MY_PAGE_MODAL_ON,
};
export const editmyinfoModalAction = {
  type: EDIT_MY_INFO_MODAL_ON,
};
export const changeMypageToEditmyinfo = {
  type: EDIT_MY_INFO_ON_MY_PAGE_OFF_MODAL,
};
export const changeEditmyinfoToMypage = {
  type: MY_PAGE_ON_EDIT_MY_INFO_OFF_MODAL,
};
export const myhistoryModalAction = {
  type: MY_HISTORY_MODAL_ON,
};
export const changeMypageToMyhistory = {
  type: MY_HISTORY_ON_MY_PAGE_OFF_MODAL,
};
export const myfavoriteModalAction = {
  type: MY_FAVORITE_MODAL_ON,
};
export const changeMypageToMyfavorite = {
  type: MY_FAVORITE_ON_MY_PAGE_OFF_MODAL,
};
export const modalOff = {
  type: MODAL_OFF,
};
