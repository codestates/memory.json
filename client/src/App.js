//library
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

//Page
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Board from "./pages/Board";

//Modal
import Signin from "./modals/Signin";
import Signup from "./modals/Signup";
import Mypage from "./modals/Mypage";

//Component
import Navbar from "./components/Navbar";
import Newhistory from "./pages/Newhistory";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  signinAction,
  logoutAction,
  signupAction,
  signinModalOnAction,
  changeSignupToSignin,
  changeSigninToSignup,
  modalOff,
} from "./store/actions";

// ------------------------------------------------------------------------------------------

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;

function Router() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const modalState = useSelector((state) => state.modalReducer);
  const signinState = useSelector((state) => state.authReducer);

  // 모달 상태
  const { isSigninModal, isSignupModal, isLogoutModal } = modalState;

  //로그인 모달 열기로 상태변경
  const modalOpener = () => {
    dispatch(signinModalOnAction);
  };

  // 모든 모달 닫기로 상태 변경
  const modalCloser = () => {
    dispatch(modalOff);
  };

  //회원가입 모달 내리고 로그인 모달 열기로 상태변경
  const changeformToSignin = () => {
    dispatch(changeSignupToSignin);
  };

  //로그인 모달 내리고 회원가입 모달 열기로 상태변경
  const changeformToSignup = () => {
    dispatch(changeSigninToSignup);
  };

  //---------------------------//

  //로그인/ 로그아웃 상태
  const { isSignin } = signinState;

  const loginIndicator = () => {
    dispatch(signinAction);
  };

  const logoutIndicator = () => {
    axios
      .post(
        `${process.env.SERVER_URL}/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("accessToken", "");
        dispatch(logoutAction);
        dispatch(modalOff);
        window.location.replace("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //로그아웃 실행

  //회원정보
  const signupIndicator = () => {
    dispatch(signupAction);
  };

  //react-modal 실행시 적어야 하는 코드
  Modal.setAppElement("#root");

  return (
    <BrowserRouter>
      <Navbar
        modalOpener={modalOpener}
        modalCloser={modalCloser}
        logoutIndicator={logoutIndicator}
        signupIndicator={signupIndicator}
      />{" "}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/Newhistory" element={<Newhistory />} />
      </Routes>
      <Modal
        style={{
          content: {
            background: "#92a8d1",
            left: "35%",
            right: "35%",
            border: "5px solid #697F6E",
            borderRadius: "1em",
          },
        }}
        isOpen={isSigninModal}
        onRequestClose={() => modalCloser()}
      >
        <Signin
          changeformToSignup={changeformToSignup}
          modalOpener={modalOpener}
          modalCloser={modalCloser}
        />
      </Modal>
      <Modal
        style={{
          content: {
            background: "#92a8d1",
            left: "35%",
            right: "35%",
            border: "5px solid #697F6E",
            borderRadius: "1em",
          },
        }}
        isOpen={isSignupModal}
        onRequestClose={() => modalCloser()}
      >
        <Signup
          modalOpener={modalOpener}
          modalCloser={modalCloser}
          changeformToSignin={changeformToSignin}
          signupIndicator={signupIndicator}
        />
      </Modal>
    </BrowserRouter>
  );
}

function App() {
  return <Router />;
}

export default App;

// 회원탈퇴 구현 //
// 마이페이지 구현 get user 정보 axios 요청
