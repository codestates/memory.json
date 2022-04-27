//library
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "react-modal";

//Page
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Board from "./pages/Board";

//Modal
import Signin from "./modals/Signin";
import Signup from "./modals/Signup";
//Component
//nav //

function Router() {
  const [isSignin, setIsSignin] = useState(false);
  //로그인 상태
  const [isModal, setIsModal] = useState(false);
  //모달 상태
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  //회원가입 모달

  const loginIndicator = () => {
    setIsSignin(true);
  };
  //로그인 실행

  const logoutIndicator = () => {
    const logoutReq = () => {};
    logoutReq();
    setIsSignin(false);
  };
  //로그아웃 실행

  const modalOpener = () => {
    setIsModal(true);
  };
  //모달 실행

  const modalCloser = () => {
    setIsModal(false);
    setSignupModalOpen(true);
  };
  //모달 닫기

  const setModalCloser = () => {
    setIsModal(false);
  };
  const setSignupModalCloser = () => {
    setSignupModalOpen(false);
  };

  //react-modal 실행시 적어야 하는 코드
  Modal.setAppElement("#root");

  return (
    <BrowserRouter>
      <Nav
        isSignin={isSignin}
        loginIndicator={loginIndicator}
        logoutIndicator={logoutIndicator}
        modalOpener={modalOpener}
      />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/main"
          element={<Main isSignin={isSignin} modalOpener={modalOpener} />}
        />
        <Route path="/board" element={<Board />} />
      </Routes>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
      >
        <Signin
          modalOpener={modalOpener}
          modalCloser={modalCloser}
          setModalCloser={setModalCloser}
          loginIndicator={loginIndicator}
        />
      </Modal>
      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={signupModalOpen}
        onRequestClose={() => setSignupModalOpen(false)}
      >
        <Signup
          setSignupModalCloser={setSignupModalCloser}
          loginIndicator={loginIndicator}
        />
      </Modal>
    </BrowserRouter>
  );
}

function App() {
  return <Router />;
}

export default App;
