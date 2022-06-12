import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import signupReducer from "./signupReducer";
import userinfoReducer from "./userinfoReducer";
import socialLoginReducer from "./socialLoginReducer";

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
  signupReducer,
  userinfoReducer,
  socialLoginReducer,
});

export default rootReducer;
