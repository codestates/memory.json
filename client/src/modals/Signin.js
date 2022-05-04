import React, { useState } from "react";
import Alert from "../components/Alert";
import styled from "styled-components";
import axios from "axios";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
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

    box-shadow: 0 0 0 2px #c4ddff;
  }
`;

const InputPassword = styled.input`
  font-size: 1.1rem;
  display: block;
  font-family: Arial;
  ::placeholder {
    font-family: "font-css";
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

    box-shadow: 0 0 0 2px #c4ddff;
  }
`;

const SignInBtn = styled.div`
  width: 60%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #c4ddff;
  border-radius: 5em;
  cursor: pointer;
`;

const SignUpBtn = styled.div`
  width: 60%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 10px 70px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  background-color: #c4ddff;
  border-radius: 5em;
`;

const SocialSignInBtn = styled.div`
  width: 100%;
  height: 50px;
  background: white;
  border: 2px solid #108dee;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: white;
  padding: 5px;
  font-size: 1.25rem;
  font-weight: bold;
  box-sizing: border-box;
  position: relative;

  :hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.07);
  }
`;

const KakaoIcon = styled.img`
  z-index: 999;
  height: 40px;
  width: 50%;
`;

const GoogleIcon = styled.img`
  z-index: 999;
  height: 40px;
  width: 50%;
`;

const MarginDiv = styled.div`
  display: flex;
`;
// ------------------------------------------------------------------------------------------

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

// ------------------------------------------------------------------------------------------

function Signin({
  isSignin,
  setUserInfo,
  loginIndicator,
  modalOpener,
  modalCloser,
  changeForm,
}) {
  // 로그인 상태 정보
  const [loginInfo, setLoginInfo] = useState({
    user_account: "",
    password: "",
  });

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    // console.log(e);
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 에러 메세지 상태변수
  const [errorMessage, setErrorMessage] = useState("");
  // 에러 발생 표기
  const [checkErr, setCheckErr] = useState(false);

  // 에러 핸들러
  const errorHandler = () => {
    setCheckErr(true);
    setTimeout(() => {
      setCheckErr(false);
    }, 2000);
  };
  const clickError = () => {
    setCheckErr(false);
  };

  //처음 로그인 요청하는 곳
  const signinHandler = () => {
    console.log("x", loginInfo);
    if (!loginInfo.user_account || !loginInfo.password) {
      setErrorMessage("아이디와 비밀번호를 입력하세요");
      errorHandler();
      return;
    }
    axios
      .post(
        `${serverUrl}users/signin`,
        {
          user_account: loginInfo.user_account,
          password: loginInfo.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.data.message === "Login Success!") {
          modalOpener();
          loginIndicator();

          const accessToken = res.data.data.accessToken;
          axios
            .get(`${serverUrl}users`, {
              headers: { authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
              console.log("getres", res.data.data);
              const userInformation = res.data.data;
              setUserInfo(userInformation);
            });
          window.location.replace("/main");
          console.log("d", isSignin);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("아이디 혹은 비밀번호가 틀립니다.");
        errorHandler();
      });
  };

  //카카오 소셜 로그인
  const kakaoSigninHandler = () => {
    let clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
    let redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    );
    modalOpener();
    modalCloser();
  };

  //구글 소셜 로그인
  const googleSigninHandler = () => {
    let clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    let redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    let scope =
      "profile%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/user.gender.read%20https://www.googleapis.com/auth/user.emails.read%20https://www.googleapis.com/auth/user.birthday.read%20https://www.googleapis.com/auth/user.addresses.read%20https://www.googleapis.com/auth/user.phonenumbers.read";
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&prompt=consent&response_type=code&client_id=${clientId}&scope=${scope}&access_type=offline`
    );
    modalOpener();
    modalCloser();
  };

  const loginPressEnter = (e) => {
    if (e.keyCode === 13) {
      signinHandler();
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
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("user_account")}
                  placeholder="아이디를 입력해주세요"
                />
              </div>
              <div>
                <span>비밀번호</span>
                <InputPassword
                  type="password"
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("password")}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
            </div>

            <SignUpBtn onClick={() => changeForm()}>회원가입</SignUpBtn>
            <SignInBtn onClick={signinHandler}>로그인</SignInBtn>

            {checkErr ? (
              <Alert message={errorMessage} setCheckErr={clickError} />
            ) : null}

            <SocialSignInBtn onClick={kakaoSigninHandler}>
              <KakaoIcon src="../img/kakao_login_medium_narrow.png" />
            </SocialSignInBtn>

            <SocialSignInBtn onClick={googleSigninHandler}>
              <GoogleIcon src="../img/googlesocaillogin.png" />
            </SocialSignInBtn>
          </ModalView>
          <Modalback onClick={modalCloser}></Modalback>
        </MarginDiv>
      )}
    </ModalArea>
  );
}

export default Signin;

// 해결해야 하는 부분
