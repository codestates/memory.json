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
//Component
import Navbar from "./components/Navbar";



// ------------------------------------------------------------------------------------------

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Router() {
  const [userInfo, setUserInfo] = useState({
    address: "",
    age: 0,
    createdAt: "",
    email: "",
    id: 0,
    mobile: "",
    provider: null,
    sex: "",
    social_id: null,
    updatedAt: "",
    user_account: "",
    user_name: "",
  });
  //회원정보
  const [isSignin, setIsSignin] = useState(false);
  //로그인 상태
  const [isModal, setIsModal] = useState(false);
  //모달 상태
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  //회원가입 모달
  const [successSignup, setSuccessSignup] = useState(false);
  //회원가입 성공 여부

  const loginIndicator = () => {
    setIsSignin(true);
  };
  //로그인 실행

  const logoutIndicator = () => {
    const logoutReq = async () => {
      try {
        const res = await axios.get(`${serverUrl}users/signout`);
        console.log(res)
      } catch (err) {
        console.log(err);
      }
    };
    logoutReq();
    setIsSignin(false);
    console.log(isSignin);
  };
  //로그아웃 실행

  const signupIndicator = () =>{
    setSuccessSignup(true);
  }
  //회원가입 성공상태

  const modalOpener = () => {
    setIsModal(true);
  };
  //모달 실행

  const modalCloser = () => {
    setIsModal(false);
    setSignupModalOpen(false);
  };
  //모달 닫기

  const setModalCloser = () => {
    setIsModal(false);
  };

  const changeForm = () => {
    setSignupModalOpen(!signupModalOpen);
    modalOpener();
  };

  //react-modal 실행시 적어야 하는 코드
  Modal.setAppElement("#root");

  return (
    <BrowserRouter>
      <Navbar
        isSignin={isSignin}
        userInfo={userInfo}
        successSignup={successSignup}
        setUserInfo={setUserInfo}
        loginIndicator={loginIndicator}
        logoutIndicator={logoutIndicator}
        modalOpener={modalOpener}
        signupIndicator ={signupIndicator}
      />{" "}
      <Routes>
        <Route path="/" element={<Landing isSignin={isSignin} />} />
        <Route
          path="/main"
          element={<Main isSignin={isSignin} modalOpener={modalOpener} />}
        />
        <Route path="/board" element={<Board />} />
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
        isOpen={isModal}
        onRequestClose={() => setIsModal(false)}
      >
        <Signin
          isSignin={isSignin}
          isModal={isModal}
          userInfo={userInfo}
          modalOpener={modalOpener}
          modalCloser={modalCloser}
          setModalCloser={setModalCloser}
          loginIndicator={loginIndicator}
          changeForm={changeForm}
          setUserInfo={setUserInfo}
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
        isOpen={signupModalOpen}
        onRequestClose={() => setSignupModalOpen(false)}
      >
        <Signup
          successSignup={successSignup}
          modalCloser={modalCloser}
          modalOpener={modalOpener}
          changeForm={changeForm}
          signupIndicator ={signupIndicator}
        />
      </Modal>
    </BrowserRouter>
  );
}

function App() {
  return <Router />;
}

export default App;
