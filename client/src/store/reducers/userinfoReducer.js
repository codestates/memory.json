import { USER_INFORMATION } from "../actions/actionTypes";

const initialState = {
  address: "",
  age: 0,
  createdAt: "",
  email: "",
  id: 0,
  mobile: "",
  provider: null,
  sex: "",
  social_id: null,
  updatedAt: "",
  user_account: "",
  user_name: "",
};

const userinfoReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case USER_INFORMATION:
      state = {
        ...prevState,
        address: action.payload.data.address,
        age: action.payload.data.age,
        createdAt: action.payload.data.createdAt,
        email: action.payload.data.email,
        id: action.payload.data.id,
        mobile: action.payload.data.age,
        provider: action.payload.data.provider,
        sex: action.payload.data.sex,
        social_id: action.payload.data.social_id,
        updatedAt: action.payload.updatedAt,
        user_account: action.payload.user_account,
        user_name: action.payload.user_name,
      };
      break;

    default:
      state = { ...prevState };
  }
  return state;
};

export default userinfoReducer;
