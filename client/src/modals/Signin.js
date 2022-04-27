import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;
const ModalBack = styled.div`
  z-index: -1;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
  min-height: 400px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: 15vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow: hidden;
`;

function Signin({ isSignin, loginIndicator, modalOpener, modalCloser }) {
  const [signinData, setSigninData] = useState({
    user_id: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setSigninData({ ...signinData, [key]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState('');
  
  // const handleLogin = () => {
  //   if (!signinData.user_id || !signinData.password) {
  //     setErrorMessage('아이디와 비밀번호를 입력하세요');
  //     return;
  //   }

  //   axios
  //     .post(``, { user_id: signinData.user_id, password: signinData.password })
  //     .then((result) => {
  //       if (result.data.message === 'ok') {
  //         modalOpener();
  //         loginIndicator();
  //         window.location.replace('/');
  //       }
  //     })
  //     .catch((err) => {
  //       setErrorMessage('아이디 혹은 비밀번호가 틀립니다.');
  //     });
  // };


  return (
    <ModalArea>
      <ModalBack>
        <ModalView>
          <div>
            <div
              role="button"
              className="back-arrow"
              aria-hidden="true"
            >
              &times;
            </div>
          </div>
          <form>
            <span>아이디</span>
            <input
              id="id"
              type="id"
              onChange={handleInputValue("id")}
              placeholder="아이디를 입력해주세요"
            />

            <span>비밀번호</span>
            <input
              id="password"
              type="password"
              onChange={handleInputValue("password")}
              placeholder="비밀번호를 입력해주세요"
            />
            <div>
              <button className="login_button" type="button">
                <span>로그인</span>
              </button>
              {/* <div onClick={openSignup}>회원가입</div> */}
            </div>
          </form>
        </ModalView>
      </ModalBack>
    </ModalArea>
  );
}

export default Signin;
