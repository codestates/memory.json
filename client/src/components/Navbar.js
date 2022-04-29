import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import PopUp from "./Popup";

// 스타일컴퍼넌트
const NavArea = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #f1ddbf;
  border-bottom: 3px solid #525e75;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FirstDiv = styled.div`
  width: 100px;
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

const SecondDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #4d4c7d;
  border-radius: 15em;
  cursor: pointer;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

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
    <NavArea>
      <FirstDiv>
        <ImageLog
          src="../img/headerLogo.png"
          alt="Image"
          onClick={() => {
            window.location.replace("/main");
          }}
        />
      </FirstDiv>
      {/* 로그인 버튼 */}
      <SecondDiv>
        <ButtonStyle
          type="button"
          onClick={modalOpener}
          style={{ color: "white", fontSize: "120%" }}
        >
          로그인버튼
        </ButtonStyle>
      </SecondDiv>
      {successSignUp ? <PopUp text={`회원가입에 성공하셨습니다.'`} /> : null}
    </NavArea>
  );
}

export default Navbar;
