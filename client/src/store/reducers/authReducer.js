import { SIGN_IN, LOG_OUT, SIGN_OUT, GET_USER } from "../actions/actionTypes";

const userInfoState = {
  isSignin: false,
  user_account: "",
  password: "",
};

const authReducer = (prevState = userInfoState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN:
      state = {
        ...prevState,
        isSignin: true,
      };
      break;
    case LOG_OUT:
      state = {
        ...userInfoState,
        isSignin: false,
      };
      break;
    case SIGN_OUT:
      state = { ...userInfoState };
      break;
    case GET_USER:
      state = {
        ...prevState,
        user_account: action.data.user_account,
        password: action.data.password,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default authReducer;
