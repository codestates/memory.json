//library
import React from "react";
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
import Editmyinfo from "./modals/Editmyinfo";
import Myhistory from "./modals/Myhistory";
import Myfavorite from "./modals/Myfavorite";
import Signout from "./modals/Signout";

//Component
import Navbar from "./components/Navbar";
import Newhistory from "./pages/Newhistory";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  signinAction,
  logoutAction,
  signupAction,
  googleAction,
  kakaoAction,
  signinModalOnAction,
  signoutModalAction,
  changeSignupToSignin,
  changeSigninToSignup,
  mypageModalAction,
  changeMypageToEditmyinfo,
  changeEditmyinfoToMypage,
  changeEditmyinfoToSignout,
  changeMypageToMyhistory,
  changeMypageToMyfavorite,
  modalOff,
} from "./store/actions";

// ------------------------------------------------------------------------------------------

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Router() {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modalReducer);
  const signinState = useSelector((state) => state.authReducer);
  const socialState = useSelector((state) => state.socialLoginReducer);

  const { isGoogelLogin, isKakaoLogin } = socialState;

  // 모달 상태
  const {
    isSigninModal,
    isSignupModal,
    isMypageModal,
    isSignoutModal,
    isEditmyinfoModal,
    isMyhistoryModal,
    isMyfavoriteModal,
  } = modalState;

  const kakaoHandler = () => {
    dispatch(kakaoAction);
  };

  const googleHandler = () => {
    dispatch(googleAction);
  };

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

  //마에페이지 모달 열기로 상태 변경
  const mypageModalOpener = () => {
    dispatch(mypageModalAction);
  };

  //마이페이지 모달에서 에디트 모달로 변경
  const changeformToEditmyinfo = () => {
    dispatch(changeMypageToEditmyinfo);
  };

  //에디트 모달에서 마이페이지 모달로 변경
  const changeformToMyinfoFromEdit = () => {
    dispatch(changeEditmyinfoToMypage);
  };

  //에디트 모달에서 회원탈퇴 모달로 변경
  const changeformToSignoutFromEdit = () => {
    dispatch(changeEditmyinfoToSignout);
  };

  //마이페이지 모달에서 마이히스토리 모달로 변경
  const changeformToMyhistory = () => {
    dispatch(changeMypageToMyhistory);
  };

  //마이페이지 모달에서 마이페이퍼리트 모달로 변경
  const changeformToMyfavorite = () => {
    dispatch(changeMypageToMyfavorite);
  };

  //---------------------------//

  //로그인/ 로그아웃 상태
  const { isSignin } = signinState;

  const loginIndicator = () => {
    dispatch(signinAction);
  };

  const logoutIndicator = () => {
    const accessTokenJson = localStorage.getItem("accessToken");
    const accessTokenObject = JSON.parse(accessTokenJson);
    const accessToken = Object.values(accessTokenObject);
    axios
      .post(
        `${serverUrl}users/signout`,
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
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
        kakaoHandler={kakaoHandler}
        googleHandler={googleHandler}
        modalOpener={modalOpener}
        modalCloser={modalCloser}
        mypageModalOpener={mypageModalOpener}
        logoutIndicator={logoutIndicator}
        signupIndicator={signupIndicator}
      />{" "}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/board" element={<Board modalOpener={modalOpener} />} />
        <Route path="/Newhistory" element={<Newhistory />} />
      </Routes>
      {/* // 로그인 모달 */}
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
      {/* // 회원가입 모달 */}
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
      {/* // 마이페이지 모달 */}
      <Modal
        style={{
          content: {
            background: "#92a8d1",
            left: "15%",
            right: "15%",
            border: "5px solid #697F6E",
            borderRadius: "1em",
          },
        }}
        isOpen={isMypageModal}
        onRequestClose={() => modalCloser()}
      >
        <Mypage
          isGoogelLogin={isGoogelLogin}
          isKakaoLogin={isKakaoLogin}
          modalCloser={modalCloser}
          mypageModalOpener={mypageModalOpener}
          changeformToEditmyinfo={changeformToEditmyinfo}
          changeformToMyhistory={changeformToMyhistory}
          changeformToMyfavorite={changeformToMyfavorite}
        />
      </Modal>
      {/* //정보수정모달 */}
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
        isOpen={isEditmyinfoModal}
        onRequestClose={() => modalCloser()}
      >
        <Editmyinfo
          isGoogelLogin={isGoogelLogin}
          isKakaoLogin={isKakaoLogin}
          modalCloser={modalCloser}
          mypageModalOpener={mypageModalOpener}
          changeformToMyinfoFromEdit={changeformToMyinfoFromEdit}
          changeformToSignoutFromEdit={changeformToSignoutFromEdit}
        />
      </Modal>
      {/* //myhistory 모달 */}
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
        isOpen={isMyhistoryModal}
        onRequestClose={() => modalCloser()}
      >
        <Myhistory
          modalCloser={modalCloser}
          mypageModalOpener={mypageModalOpener}
        />
      </Modal>
      {/* //myfavorite 모달 */}
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
        isOpen={isMyfavoriteModal}
        onRequestClose={() => modalCloser()}
      >
        <Myfavorite
          modalCloser={modalCloser}
          mypageModalOpener={mypageModalOpener}
        />
      </Modal>
      {/* //회원탈퇴 모달 */}
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
        isOpen={isSignoutModal}
        onRequestClose={() => modalCloser()}
      >
        <Signout
          modalCloser={modalCloser}
          mypageModalOpener={mypageModalOpener}
        />
      </Modal>
    </BrowserRouter>
  );
}

function App() {
  return <Router />;
}

export default App;
