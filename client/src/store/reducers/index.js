import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import signupReducer from "./signupReducer";

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
  signupReducer,
});

export default rootReducer;
