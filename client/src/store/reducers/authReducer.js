import { SIGN_IN, LOG_OUT, SIGN_OUT } from "../actions/actionTypes";

const userInfoState = {
  isSignin: false,
  user_account: "",
  password: "",
};

const auth = (prevState = userInfoState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN:
      state = {
        ...prevState,
        isLogin: true,
      };
      break;
    case LOG_OUT:
      state = {
        ...userInfoState,
        isLogin: false,
      };
      break;
    case SIGN_OUT:
      state = { ...userInfoState };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default auth;
