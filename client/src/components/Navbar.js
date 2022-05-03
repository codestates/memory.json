import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import PopUp from "./Popup";
import * as S from "./Navbar.style";

function Navbar({ logoutIndicator, modalOpener }) {
  const [successSignUp, setSuccessSignUp] = useState(false);

  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post(`${process.env.REACT_APP_API_URL}users/auth`, {
      authorizationCode,
    });
    logoutIndicator();

    if (resp.status === 201) {
      setSuccessSignUp(true);
    } else {
      window.location.replace("/main");
    }
  };

  useEffect(() => {
    // 소셜로 부터 리디렉션 됬을때 접근코드를 서버에게보냄.
    let url = new URL(window.location.href);
    let authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, []);

  return (
    <S.NavArea>
      <S.FirstDiv>
        <S.ImageLog
          src="../img/memorylogo.png"
          alt="Image"
          onClick={() => {
            window.location.replace("/main");
          }}
        />
      </S.FirstDiv>
      {/* 로그인 버튼 */}
      <S.SecondDiv>
        <S.ButtonStyle
          type="button"
          onClick={modalOpener}
          style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
        >
          로그인버튼
        </S.ButtonStyle>
      </S.SecondDiv>
      {successSignUp ? <PopUp text={`회원가입에 성공하셨습니다.'`} /> : null}
    </S.NavArea>
  );
}

export default Navbar;
