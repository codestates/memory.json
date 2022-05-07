import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./Navbar.style";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../store/actions";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
// ------------------------------------------------------------------------------------------

function Navbar({
  modalOpener,
  modalCloser,
  logoutIndicator,
  signupIndicator,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;
  const signupState = useSelector((state) => state.signupReducer);
  const { signup } = signupState;

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
      dispatch(signinAction);
      alert("회원가입에 성공하셨습니다!");
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
      dispatch(signinAction);
      alert("회원가입에 성공하셨습니다!");
      modalCloser();
    } else {
      window.location.replace("/main");
    }
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
      {/* 로그인 버튼 */}
      <S.SecondDiv>
        {!isSignin ?  (
          <S.ButtonStyle
            type="button"
            onClick={modalOpener}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            로그인
          </S.ButtonStyle>
        ):(
          <S.ButtonStyle
            type="button"
            onClick={logoutIndicator}
            style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
          >
            로그아웃
          </S.ButtonStyle>
        )}
      </S.SecondDiv>
    </S.NavArea>
  );
}

export default Navbar;
