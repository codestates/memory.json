import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./Navbar.style";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../store/actions";
import { FaRegUser } from "react-icons/fa";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
// ------------------------------------------------------------------------------------------

function Navbar({
  isKakaoLogin,
  isGoogelLogin,
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
    if (authorizationScope === null) {
      kakaoGetAccessToken(authorizationCode);
    } else {
      googleGetAccessToken(authorizationCode);
    }
  }, [isKakaoLogin, isGoogelLogin]);

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
      window.location.replace("/main");
    }
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
      console.log(res);
      signupIndicator();
      alert(`${res.data.message}`);
      const accessToken = res.data.data;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      dispatch(signinAction);
      modalCloser();
    } else {
      window.location.replace("/main");
    }
  };

  const checkedLogin = () => {
    alert("로그인을 해주세요");
    modalOpener();
  };

  return (
    <S.NavArea>
      <S.FirstDiv>
        <S.ImageLog
          src="../img/memorylogo.png"
          alt="Image"
          onClick={() => {
            navigate("/main");
          }}
        />
      </S.FirstDiv>
      <S.SecondDiv>
        {!isSignin ? (
          <S.MypagebuttonStyle
            type="button"
            onClick={checkedLogin}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            <FaRegUser size="24" color="#fff"></FaRegUser>
          </S.MypagebuttonStyle>
        ) : (
          <S.MypagebuttonStyle
            type="button"
            onClick={mypageModalOpener}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            <FaRegUser size="24" color="#fff"></FaRegUser>
          </S.MypagebuttonStyle>
        )}
      </S.SecondDiv>
      <S.ThirdDiv>
        {!isSignin ? (
          <S.LoginbuttonStyle
            type="button"
            onClick={modalOpener}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            로그인
          </S.LoginbuttonStyle>
        ) : (
          <S.LoginbuttonStyle
            type="button"
            onClick={logoutIndicator}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            로그아웃
          </S.LoginbuttonStyle>
        )}
      </S.ThirdDiv>
    </S.NavArea>
  );
}

export default Navbar;
