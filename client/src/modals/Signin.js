import React, { useState } from "react";
import Alert from "../components/Alert";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinAction, getUserAction } from "../store/actions";

const ModalArea = styled.div`
  z-index: 999;
  position: relative;
  height: 100%;
  text-align: center;
  font-family: "Roboto";
`;
const Modalback = styled.div`
  z-index: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
  min-height: 600px;
  background: #BDBDBD;
  box-shadow: 0 0 30px #333;
  border-radius: 3em;
  position: fixed;
  margin: 15vh auto;
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
  margin-bottom: 3rem;
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
  width: 65%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 60px;
  color: #0E0E0E;
  font-weight: 600;
  font-size: 20px;
  background-color: #eee;
  border-radius: 5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const SignUpBtn = styled.div`
  width: 65%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 60px;
  font-weight: 600;
  font-size: 20px;
  color: #eee; 
  background-color: #0E0E0E;
  border-radius: 5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const SocialSignInBtn = styled.div`
  width: 100%;
  height: 50px;
  background: #BDBDBD;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
`;

const KakaoIcon = styled.img`
  z-index: 999;
  height: 45px;
  width: 40%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    overflow: hidden;
  }
`;

const GoogleIcon = styled.img`
  z-index: 999;
  height: 45px;
  width: 40%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    overflow: hidden;
  }
`;
const MarginDiv = styled.div`
  display: flex;
`;
// ------------------------------------------------------------------------------------------

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

// ------------------------------------------------------------------------------------------

function Signin({ changeformToSignup, modalCloser, modalOpener }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;

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
    }, 3000);
  };
  const clickError = () => {
    setCheckErr(false);
  };

  //처음
  const signinHandler = () => {
    // console.log("x", loginInfo);
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
        // console.log(res)
        if (res.status === 200) {
          // console.log(res.data.data);
          const accessToken = res.data.data;
          // console.log(accessToken);
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          dispatch(signinAction);
          modalCloser();
          alert("로그인에 성공하셨습니다!");
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(`${err.response.data.message}`);
        errorHandler();
      });
    dispatch(getUserAction(loginInfo.user_account, loginInfo.password));
  };

  //카카오 소셜 로그인
  const kakaoSigninHandler = () => {
    let clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
    console.log(clientId);
    let redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    );
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
              <h1>LOGIN</h1>
              <div>
                <h3>ID</h3>
                <Input
                  type="text"
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("user_account")}
                  placeholder="아이디를 입력해주세요"
                />
              </div>
              <div>
                <h3>PASSWORD</h3>
                <InputPassword
                  type="password"
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("password")}
                  placeholder="비밀번호를 입력해주세요"
                />
              </div>
            </div>

            <SignUpBtn onClick={() => changeformToSignup()}>SIGN UP</SignUpBtn>
            <SignInBtn onClick={signinHandler}>LOGIN</SignInBtn>

            {checkErr ? (
              <Alert message={errorMessage} setCheckErr={clickError} />
            ) : null}
            <SocialSignInBtn>
              <KakaoIcon
                src="../img/kakao_login_large_narrow.png"
                onClick={kakaoSigninHandler}
              />
              <GoogleIcon
                src="../img/btn_google_signin_dark_focus_web@2x.png"
                onClick={googleSigninHandler}
              />
            </SocialSignInBtn>
          </ModalView>
          <Modalback onClick={modalCloser}></Modalback>
        </MarginDiv>
      )}
    </ModalArea>
  );
}

export default Signin;
