import {
  SIGN_IN_MODAL_ON,
  SIGN_UP_MODAL_ON,
  MODAL_OFF,
  SIGN_OUT_MODAL_ON,
  SIGN_IN_ON_SIGN_UP_OFF_MODAL,
  SIGN_UP_ON_SIGN_IN_OFF_MODAL,
  LOG_OUT_MODAL_ON,
  MY_PAGE_MODAL_ON,
  EDIT_MY_INFO_MODAL_ON,
  EDIT_MY_INFO_ON_MY_PAGE_OFF_MODAL,
  MY_PAGE_ON_EDIT_MY_INFO_OFF_MODAL,
  SIGN_OUT_ON_EDIT_MY_INFO_OFF_MODAL,
  MY_HISTORY_MODAL_ON,
  MY_HISTORY_ON_MY_PAGE_OFF_MODAL,
  MY_FAVORITE_MODAL_ON,
  MY_FAVORITE_ON_MY_PAGE_OFF_MODAL,
} from "../actions/actionTypes";

const initialState = {
  isSigninModal: false,
  isLogoutModal: false,
  isSignupModal: false,
  isSignoutModal: false,
  isMypageModal: false,
  isEditmyinfoModal: false,
  isMyhistoryModal: false,
  isMyfavoriteModal: false,
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
    case SIGN_IN_ON_SIGN_UP_OFF_MODAL:
      state = { ...prevState, isSigninModal: true, isSignupModal: false };
      break;
    case SIGN_UP_ON_SIGN_IN_OFF_MODAL:
      state = { ...prevState, isSignupModal: true, isSigninModal: false };
      break;
    case MY_PAGE_MODAL_ON:
      state = { ...prevState, isMypageModal: true };
      break;
    case EDIT_MY_INFO_MODAL_ON:
      state = { ...prevState, isEditmyinfoModal: true };
      break;
    case EDIT_MY_INFO_ON_MY_PAGE_OFF_MODAL:
      state = { ...prevState, isEditmyinfoModal: true, isMypageModal: false };
      break;
    case SIGN_OUT_ON_EDIT_MY_INFO_OFF_MODAL:
      state = { ...prevState, isSignoutModal: true, isEditmyinfoModal: false };
      break;
    case MY_PAGE_ON_EDIT_MY_INFO_OFF_MODAL:
      state = { ...prevState, isMypageModal: true, isEditmyinfoModal: false };
      break;
    case MY_HISTORY_MODAL_ON:
      state = { ...prevState, isMyhistoryModal: true };
      break;
    case MY_HISTORY_ON_MY_PAGE_OFF_MODAL:
      state = { ...prevState, isMypageModal: false, isMyhistoryModal: true };
      break;
    case MY_FAVORITE_MODAL_ON:
      state = { ...prevState, isMyfavoriteModal: true };
      break;
    case MY_FAVORITE_ON_MY_PAGE_OFF_MODAL:
      state = { ...prevState, isMyfavoriteModal: true, isMypageModal: false };
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
