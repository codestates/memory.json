import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Signup({  }) {
  const [signUpInfo, setSignUpInfo] = useState({
    user_name: '',
    user_account: '',
    password: '',
    mobile: '',
    email: '',
    address: '',
    age: '',

  });
  const [validateErr, setValidateErr] = useState('');
  const [successSignUp, setSuccessSignUp] = useState(false);

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
  };
}

  export default Signup;