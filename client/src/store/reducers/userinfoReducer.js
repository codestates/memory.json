import { USER_INFORMATION } from "../actions/actionTypes";

const initialState = {
  address: "",
  age: 0,
  email: "",
  id: 0,
  mobile: "",
  provider: null,
  sex: "",  
  social_id: null,
  user_account: "",
  user_name: "",
};

const userinfoReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case USER_INFORMATION:
      state = {
        ...prevState,
        address: action.data.address,
        age: action.data.age,
        email: action.data.email,
        id: action.data.id,
        mobile: action.data.mobile,
        provider: action.data.provider,
        sex: action.data.sex,
        social_id: action.data.social_id,
        user_account: action.data.user_account,
        user_name: action.data.user_name,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default userinfoReducer;
