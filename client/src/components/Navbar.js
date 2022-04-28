import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import PopUp from "./Popup";

// 스타일컴퍼넌트
const NavArea = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background-color: blue;
`;

const FirstDiv = styled.div`
  margin-left: 0%;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: yellow;
`;

const ImageLog = styled.img`
  min-height: 50px;
  height: 50px;
  margin-left: 5%;
  margin-bottom: 5%;
  cursor: pointer;
`;

const SecondDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10%;
  background-color: black;
  cursor: pointer;
`;

const ButtonStyle = styled.button`
  border: none;
  width: 300px;
  height: 300px;
  margin-left: 15px;
  cursor: pointer;
  background-color: transparent;
`;

function Navbar({
  logoutIndicator,
  modalOpener,
}) {
  const [successSignUp, setSuccessSignUp] = useState(false);
  const documentRef = useRef(document);

  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post(`${process.env.REACT_APP_API_URL}users/auth`, {
      authorizationCode,
    });
    logoutIndicator();

    if (resp.status === 201) {
      setSuccessSignUp(true);
    } else {
      window.location.replace("/");
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
            src="../img/headerlogo.jpeg"
            alt="Image"
            onClick={() => {
              window.location.replace("/main");
            }}
          />
          <SecondDiv>
            {/* 로그인 버튼 */}
            <ButtonStyle type="button" onClick={modalOpener} style={{ color: "yellow", fontSize: "30px" }}>
              로그인버튼
            </ButtonStyle>
          </SecondDiv>
        </FirstDiv>
        {successSignUp ? (
          <PopUp
            text={`회원가입에 성공하셨습니다.'`}
          />
        ) : null}
    </NavArea>
  );
}

export default Navbar;
