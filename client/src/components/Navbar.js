import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopUp from "./Popup";
import * as S from "./Navbar.style";

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;
// ------------------------------------------------------------------------------------------

function Navbar({ logoutIndicator, modalOpener }) {
  const [successSignUp, setSuccessSignUp] = useState(false);
  
  const navigate = useNavigate()

  const getAccessToken = async (authorizationCode) => {
    let resp = await axios.post(`${serverUrl}users/social`, {
      authorizationCode,
    });
    logoutIndicator();
    if (resp.status === 201) {
      setSuccessSignUp(true);
    } else {
     navigate("/main");
    }
  };
  // 소셜로 부터 리디렉션 됬을때 접근코드를 서버에게보냄.
  useEffect(() => {
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
            navigate("/main");
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
