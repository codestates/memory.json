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
  height: 90%;
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
  width: 30%;
  height: 70%;
  min-height: 400px;
  background: #bdbdbd;
  box-shadow: 0 0 30px #333;
  border-radius: 3em;
  position: fixed;
  margin: 15vh auto;
  left: 0;
  right: 0;
  top:0;
  overflow: hidden;
`;

const ImageLog = styled.img`
  width: 80%;
  height: 50%;
  margin-top: 1%;
  margin-bottom: 1%;
  object-fit: cover;
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
  font-size: 1.5rem;
  font-weight: normal;
  display: block;

  width: 80%;
  margin-top:0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: #0e0e0e;
  border-radius: 5em;
  border: 0;
  outline: 0;
  background: #eee;
  background-color: #eee;
  box-shadow: 0 0 0 2px transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const SignUpBtn = styled.div`
  font-size: 1.5rem;
  font-weight: normal;
  display: block;

  width: 80%;
  margin-top:0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: #eee;
  border-radius: 5em;
  border: 0;
  outline: 0;
  background: #eee;
  background-color: #0e0e0e;
  box-shadow: 0 0 0 2px transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const SocialSignInBtn = styled.div`
  width: 100%;
  height: 50px;
  background: #bdbdbd;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
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

// axios ?????? / ???????????? ????????????
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

// ------------------------------------------------------------------------------------------

function Signin({ changeformToSignup, modalCloser, modalOpener }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;

  // ????????? ?????? ??????
  const [loginInfo, setLoginInfo] = useState({
    user_account: "",
    password: "",
  });

  //????????? ????????? ?????? ?????????
  const handleInputValue = (key) => (e) => {
    // console.log(e);
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // ?????? ????????? ????????????
  const [errorMessage, setErrorMessage] = useState("");
  // ?????? ?????? ??????
  const [checkErr, setCheckErr] = useState(false);

  // ?????? ?????????
  const errorHandler = () => {
    setCheckErr(true);
    setTimeout(() => {
      setCheckErr(false);
    }, 3000);
  };
  const clickError = () => {
    setCheckErr(false);
  };

  //??????
  const signinHandler = () => {
    // console.log("x", loginInfo);
    if (!loginInfo.user_account || !loginInfo.password) {
      setErrorMessage("???????????? ??????????????? ???????????????");
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
          alert("???????????? ?????????????????????!");
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

  //????????? ?????? ?????????
  const kakaoSigninHandler = () => {
    let clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
    console.log(clientId);
    let redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    );
  };

  //?????? ?????? ?????????
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
              <h1>
                <ImageLog src="../img/memorylogo.png" alt="Image" />
              </h1>
              <h1 style={{borderBottom: "2px solid #000000" }}>
                LOGIN
              </h1>
              <div>
                <h3 >ID</h3>
                <Input
                  type="text"
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("user_account")}
                  placeholder="???????????? ??????????????????"
                />
              </div>
              <div style={{borderBottom: "2px solid #000000" }}>
                <h3>PASSWORD</h3>
                <InputPassword
                  type="password"
                  autoComplete="on"
                  onKeyUp={loginPressEnter}
                  onChange={handleInputValue("password")}
                  placeholder="??????????????? ??????????????????"
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
