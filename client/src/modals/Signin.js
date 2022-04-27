import React, { useState } from 'react';
import Alert from './Alert';
import styled from 'styled-components';
import axios from 'axios';

const ModalArea = styled.div`
`;
const Modalback = styled.div`
`;

const ModalView = styled.div`
`;

const Input = styled.input`
`;

const InputPassword = styled.input`
`;

const SignInBtn = styled.div`
`;

const SocialSignInBtn = styled.div`
`;

const SignUpBtn = styled.div`
`;


const MarginDiv = styled.div`
  display: flex;
`;
// ------------------------------------------------------------------------------------------
axios.defaults.withCredentials = true;

function Signin({ isSignin, setUserInfo, loginIndicator, modalOpener, modalCloser, changeForm }) {
  const [loginInfo, setLoginInfo] = useState({
    user_account: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [checkErr, setCheckErr] = useState(false);

  const handleErr = () => {
    setCheckErr(true);
    setTimeout(() => {
      setCheckErr(false);
    }, 3000);
  };
  const clickErrBox = () => {
    setCheckErr(false);
  };

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //로그인 요청하는 곳
  const handleLogin = () => {
    if (!loginInfo.user_account || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      handleErr();
      return;
    }

    axios
      .post("http://localhost:4000/users//signin", { id: loginInfo.user_account, password: loginInfo.password })
      .then((result) => {
        if (result.data.message === "Login Success!") {
          modalOpener();
          loginIndicator();
          axios.get("http://localhost:4000/users").then((data) => setUserInfo(data.data.data));
          window.location.replace('/');
        }
      })
      .catch((err) => {
        setErrorMessage('아이디 혹은 비밀번호가 틀립니다.');
        handleErr();
      });
  };

  //소셜 로그인 
  // const socialLoginHandler = () => {
  //   let clientId = process.env.REACT_APP_CLIENT_ID;
  //   let redirectUri = process.env.REACT_APP_REDIRECT_URI;
  //   window.location.assign(
  //     `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`,
  //   );

  //   modalOpener();
  //   modalCloser();
  // };
  const loginPressEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <ModalArea>
      {isSignin ? null : (
        <MarginDiv>
          <ModalView>
            <div>
              <h1>SIGN IN</h1>
              <div>
                <span>아이디</span>
                <Input
                  type="id"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue('id')}
                  placeholder="아이디를 입력해주세요"
                />
              </div>
              <div>
                <span>비밀번호</span>
                <InputPassword
                  type="password"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue('password')}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
            </div>

            <SignUpBtn onClick={() => changeForm()}>아직 아이디가 없으신가요?</SignUpBtn>
            <SignInBtn onClick={handleLogin}>Sign In</SignInBtn>

            {checkErr ? <Alert message={errorMessage} setCheckErr={clickErrBox} /> : null}

            {/* <SocialSignInBtn onClick={socialLoginHandler}>
              <img
                src=""
                alt="login"
                style={{ position: 'relative', width: '100%', top: '-9%', zIndex: '-1', backgroundColor: '#fee518' }}
              />
            </SocialSignInBtn> */}
          </ModalView>
          <Modalback onClick={() => modalCloser()}></Modalback>
        </MarginDiv>
      )}
    </ModalArea>
  );
}

export default Signin;
