import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import signupReducer from "./signupReducer";
import userinfoReducer from "./userinfoReducer";

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
  signupReducer,
  userinfoReducer,
});

export default rootReducer;
