import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../store/actions";
import { FaRegUser } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { GoSignIn, GoSignOut } from "react-icons/go";

const NavArea = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #2c394b;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FirstDiv = styled.div`
  width: 300px;
  height: 50px;
  background-color: transparent;
  margin: 1em 1em 1em 1em;
`;

const ImageLog = styled.img`
  width: 300px;
  height: 50px;
  margin-top: 1%;
  margin-left: 5%;
  margin-bottom: 5%;
  cursor: pointer;
`;

const Btndiv = styled.div`
  width: 100%;
  height: 100%;
  background: #2c394b;
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  align-items: center;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
`;

const SecondDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const ThirdDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const FourthDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const LoginbuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const MypagebuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const BoardbuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
// ------------------------------------------------------------------------------------------

function Navbar({
  kakaoHandler,
  googleHandler,
  modalOpener,
  modalCloser,
  logoutIndicator,
  signupIndicator,
  mypageModalOpener,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;

  // 리디렉션 됬을때 접근코드를 서버에게보냄.
  useEffect(() => {
    const href = window.location.href;
    // console.log(href);
    let params = new URL(href).searchParams;
    let authorizationCode = params.get("code");
    let authorizationScope = params.get("scope");
    // console.log(authorizationCode)
    // console.log(authorizationScope)
    if (authorizationCode === null) {
      return;
    }
    if (authorizationScope === null) {
      kakaoGetAccessToken(authorizationCode);
    } else {
      googleGetAccessToken(authorizationCode);
    }
  }, []);

  // 카카오 로그인 코드 전송
  const kakaoGetAccessToken = async (authorizationCode) => {
    let res = await axios.post(
      `${serverUrl}users/socialByKakao`,
      {
        authorizationCode,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      signupIndicator();
      alert(`${res.data.message}`);
      const accessToken = res.data.data;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      dispatch(signinAction);
      modalCloser();
    } else {
      alert("처음 회원가입시 다시한번 로그인을 해주세요");
      window.location.replace("/main");
    }
    kakaoHandler();
  };

  // 구글 로그인 코드 전송
  const googleGetAccessToken = async (authorizationCode) => {
    let res = await axios.post(
      `${serverUrl}users/socialByGoogle`,
      {
        authorizationCode,
      },
      { withCredentials: true },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      // console.log(res);
      signupIndicator();
      alert(`${res.data.message}`);
      const accessToken = res.data.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      dispatch(signinAction);
      modalCloser();
    } else {
      window.location.replace("/main");
    }
    googleHandler();
  };

  const checkedLogin = () => {
    alert("로그인을 해주세요");
    modalOpener();
  };

  const boardLink = () => {
    navigate("/board");
  };
  return (
    <NavArea>
      <FirstDiv>
        <ImageLog
          src="../img/memorylogo.png"
          alt="Image"
          onClick={() => {
            navigate("/main");
          }}
        />
      </FirstDiv>
      <Btndiv>
        <SecondDiv>
          <BoardbuttonStyle
            type="button"
            onClick={boardLink}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            <FaSearchLocation size="24" color="#fff"></FaSearchLocation>
          </BoardbuttonStyle>
        </SecondDiv>
        <ThirdDiv>
          {!isSignin ? (
            <MypagebuttonStyle
              type="button"
              onClick={checkedLogin}
              style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
            >
              <FaRegUser size="24" color="#fff"></FaRegUser>
            </MypagebuttonStyle>
          ) : (
            <MypagebuttonStyle
              type="button"
              onClick={mypageModalOpener}
              style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
            >
              <FaRegUser size="24" color="#fff"></FaRegUser>
            </MypagebuttonStyle>
          )}
        </ThirdDiv>
        <FourthDiv>
          {!isSignin ? (
            <LoginbuttonStyle
              type="button"
              onClick={modalOpener}
              style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
            >
              LOGIN <GoSignIn size="15" color="#fff"></GoSignIn>
            </LoginbuttonStyle>
          ) : (
            <LoginbuttonStyle
              type="button"
              onClick={logoutIndicator}
              style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
            >
              LOGOUT <GoSignOut size="15" color="#fff"></GoSignOut>
            </LoginbuttonStyle>
          )}
        </FourthDiv>
      </Btndiv>
    </NavArea>
  );
}

export default Navbar;
