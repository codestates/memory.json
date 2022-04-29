import React, { useState } from "react";
import Alert from "../components/Alert";
import styled from "styled-components";
import axios from "axios";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: 'font-css';
`;
const Modalback = styled.div`
  z-index: -1;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
  min-height: 800px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: 15vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const Input = styled.input`
  font-size: 1.1rem;
  font-weight: normal;
  display: block;

  width: 80%;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: black;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const InputPassword = styled.input`
  font-size: 1.1rem;
  display: block;
  font-family: Arial;
  ::placeholder {
    font-family: 'font-css';
  }

  width: 80%;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;

  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: black;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const SignInBtn = styled.div`
  color: white;
  font-weight: 700;
  font-size: 1em;
  margin: 0.5em;
  padding: 1em;
  margin-bottom: 5rem;
  margin-top: 1rem;
  background-color: #697f6e;
  border: 4px solid blue;
  border-radius: 5em;
  cursor: pointer;
`;

const SocialSignInBtn = styled.div`
  width: 100%;
  height: 18%;

  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  :hover {
    border: 2px solid #fee518;
  }
`;

const SignUpBtn = styled.div`
  width: 100%;
  height: 5%;
  padding-top: 30px;
  padding-bottom: 30px;
  cursor: pointer;
  font-size: 1.3rem;
  color: black;
  background: linear-gradient( to top, yellow, red );
  border: 4px solid blue;
  border-radius: 5em;
`;

const MarginDiv = styled.div`
  display: flex;
`;
// ------------------------------------------------------------------------------------------
axios.defaults.withCredentials = true;

function Signin({
  isSignin,
  setUserInfo,
  loginIndicator,
  modalOpener,
  modalCloser,
  changeForm,
}) {
  const [loginInfo, setLoginInfo] = useState({
    user_account: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
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
    console.log(e)
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  //처음 로그인 요청하는 곳
  const handleLogin = () => {
    console.log(loginInfo)
    if (!loginInfo.user_account || !loginInfo.password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요");
      handleErr();
      return;
    }

    axios
      .post("http://localhost:4000/users/signin", {
        user_account: loginInfo.user_account,
        password: loginInfo.password,
      })
      .then((result) => {
        if (result.data.message === "Login Success!") {
          modalOpener();
          loginIndicator();
          axios
            .get("http://localhost:4000/users")
            .then((data) => setUserInfo(data.data.data));
          window.location.replace("/");
        }
      })
      .catch((err) => {
        setErrorMessage("아이디 혹은 비밀번호가 틀립니다.");
        handleErr();
      });
  };

  //소셜 로그인
  const kakaoloiginhandler = () => {
    let clientId = process.env.REACT_APP_CLIENT_ID;
    let redirectUri = process.env.REACT_APP_REDIRECT_URI;
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`,
    );
    modalOpener();
    modalCloser();
  };

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
              <h1>로그인</h1>
              <div>
                <span>아이디</span>
                <Input
                  type="text"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("user_account")}
                  placeholder="아이디를 입력해주세요"
                />
              </div>
              <div>
                <span>비밀번호</span>
                <InputPassword
                  type="text"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("password")}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
            </div>

            <SignUpBtn onClick={() => changeForm()}>
              처음 오셨나요?? 여기를 눌러서 회원가입을 해주세요 !
            </SignUpBtn>
            <SignInBtn onClick={handleLogin}>Sign In</SignInBtn>

            {checkErr ? (
              <Alert message={errorMessage} setCheckErr={clickErrBox} />
            ) : null}
            <SocialSignInBtn onClick={kakaoloiginhandler}>
              <img
                src="../img/kakao_login_medium_narrow.png"
                alt="login"
                style={{ position: 'relative', width: '100%', top: '-9%', zIndex: '-1', backgroundColor: '#fee518' }}
              />
            </SocialSignInBtn>
          </ModalView>
          <Modalback onClick={() => modalCloser()}></Modalback>
        </MarginDiv>
      )}
    </ModalArea>
  );
}

export default Signin;
