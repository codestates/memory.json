import { GOOGLE_LOGIN, KAKAO_LOGIN } from "../actions/actionTypes";

const socialLoginState = {
  isGoogelLogin: false,
  isKakaoLogin: false
};

const socialLoginReducer = (prevState = socialLoginState, action) => {
  let state;
  switch (action.type) {
    case GOOGLE_LOGIN:
      state = {
        ...prevState,
        isGoogelLogin: true,
      };
      break;
    case KAKAO_LOGIN:
      state = {
        ...prevState,
        isKakaoLogin: true,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default socialLoginReducer;
