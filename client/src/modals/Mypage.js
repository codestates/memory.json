import styled from "styled-components";
import React from "react";
import Header from "../component/Header";
import Header2 from "../component/Header2";
import Footer from "../component/Footer";
import { useState, useEffect } from "react";
import SignOut from "../modalComponent/SignOut";
import PwdChange1 from "../modalComponent/PwdChange1";
import axios from "axios";
import { signoutModalAction, pwdModalAction } from "../store/actions";
import MypageContent from "./MypageContent";
import MypageComment from "./MypageComment";
import MypageManage from "./MypageManage";
import MypageMenuBar from "./MypageMenuBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BoxContainer = styled.div`
  max-width: 2000px;
  margin: auto;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const UserInfo = styled.div`
  height: 100%;
  font-family: "Kfont";

  .Box {
    width: 100%;
    height: 100%;
    display: flex;
    background: #ace0ff;
    align-items: center;
    padding: 6em 0 6em;
  }

  .userImg {
    position: relative;
    width: 17%;
    /* border: 1px solid black; */
    display: flex;
    left: 27%;
  }

  .img {
    width: 100%;
    height: 100%;
  }
  .user {
    width: 30%;
    height: 30%;
    /* border: 1px solid red; */
    margin-top: 5%;
    position: relative;
    left: 29%;
  }

  .userGreeting {
    position: relative;
    width: 100%;
    height: 15%;
    font-size: 1.7em;
    font-weight: bold;
    padding-bottom: 0.2em;
    /* border: 1px solid red; */
  }
  .userNotice {
    position: relative;
    width: 100%;
    height: 10%;

    /* border: 1px solid black; */
  }

  @media screen and (min-width: 2000px) {
    .userGreeting {
      font-size: 2rem;
    }
    .userNotice {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 1024px) {
    .userGreeting {
      font-size: 1.4rem;
      margin-bottom: 1%;
    }
    .userNotice {
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 768px) {
    .userGreeting {
      font-size: 1rem;
      margin-bottom: 1%;
    }
    .userNotice {
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 480px) {
    .Box {
      width: 101%;
      height: 100%;
      padding: 2em 0 2em;
    }

    .userImg {
      position: relative;
      width: 30%;
      left: 15%;
    }
    .user {
      width: 40%;
      left: 20%;
    }
    .userGreeting {
      font-size: 0.8rem;
    }
    .userNotice {
      font-size: 0.6rem;
    }
  }
`;
const Container = styled.div`
  position: relative;
  display: flex;
  max-width: 1450px;
  margin: auto;
  height: 25vh;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 480px) {
    height: 100px;
  }
`;
const TitleContainer = styled.div`
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: left;
  line-height: 500%;
  @media screen and (max-width: 480px) {
    width: 80vw;
    height: 15vh;
  }
`;

const Title = styled.div`
  position: relative;
  width: 13vw;
  height: 8vh;
  font-size: 1.7rem;
  font-weight: bold;
  justify-content: center;
  top: 63%;
  right: 8%;
  @media screen and (max-width: 1135px) {
    font-size: 1.25rem;
    height: 3vh;
    width: 30vw;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Box1 = styled.div`
  position: relative;
  justify-content: space-evenly;
  display: flex;
  width: 20%;
  height: 19%;
  left: 22%;
  top: 8%;
  /* border: 1px solid black; */

  @media screen and (min-width: 2000px) {
    right: 0%;
  }

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 15%;
    height: 40%;
    top: 3%;
  }

  @media screen and (max-width: 480px) {
    width: 50%;
    height: 50%;
    left: 25%;
    top: 50%;
    justify-content: space-between;
    /* top: 10% */
    /* flex-direction: column; */
    /* border: 1px solid black; */
    gap: 4px;
    align-items: center;
  }
  @media screen and (max-width: 330px) {
    left: 20%;
    width: 60%;
  }
`;
const ButtonL = styled.button`
  width: 40%;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  border: 1px solid #108dee;
  background: #108dee;

  @media screen and (max-width: 1024px) {
    font-size: 0.7rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    width: 100%;
    height: 35%;
  }
  @media screen and (max-width: 480px) {
    width: 50%;
    height: 25px;
    border-radius: 4px;
  }
`;
const ButtonR = styled.button`
  width: 40%;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background: #cccccc;

  @media screen and (max-width: 1024px) {
    font-size: 0.7rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    width: 100%;
    height: 35%;
  }
  @media screen and (max-width: 480px) {
    width: 50%;
    height: 25px;
    border-radius: 4px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 480px) {
    margin-bottom: 10%;
  }
`;

const Box3 = styled.div`
  border: 1px solid #ace0ff;
  margin-top: 4em;
  width: 70vw;
  height: 90vh;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1024px) {
    margin-top: 3em;
  }

  @media screen and (max-width: 768px) {
    margin-top: 2em;
  }

  @media screen and (max-width: 480px) {
    border: 1px solid black;
    height: 60vh;
    width: 80vw;
    font-size: 0.7rem;
    border: 1px solid #cccccc;
  }
`;

function Mypage() {
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState("manage");
  //========================================================================
  const state = useSelector((state) => state.modalReducer);
  const { isSignoutModal } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    manageHandler();
  }, []);

  const manageHandler = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/manage/1`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then((result) => {
        setUserName([...result.data.user_name]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOn = () => {
    setOpenModal(true);
  };
  const handleOff = () => {
    setOpenModal(false);
  };

  function pageRender() {
    if (currentPage === "manage") {
      return <MypageManage />;
    } else if (currentPage === "comment") {
      return <MypageComment />;
    } else if (currentPage === "contents") {
      return <MypageContent />;
    }
  }

  return (
    <>
      {/* <Header /> */}
      <Header2 />
      <BoxContainer>
        <UserInfo>
          <div className="Box">
            <div className="userImg">
              <img className="img" src="유저3.png"></img>
            </div>
            <div className="user">
              <div className="userGreeting">{userName}님 환영합니다!</div>
              <div className="userNotice">
                마이페이지에서는 간략한 사용자정보를 조회할 수 있습니다.
              </div>
            </div>
          </div>
        </UserInfo>
        <Container>
          <TitleContainer>
            <Title>계정정보 조회</Title>
            <Box1>
              <ButtonL onClick={handleOn}>비밀번호 변경</ButtonL>
              {openModal && <PwdChange1 handleOff={handleOff} />}
              <ButtonR
                onClick={() => {
                  dispatch(signoutModalAction);
                }}
              >
                회원탈퇴
              </ButtonR>
            </Box1>
          </TitleContainer>
        </Container>

        {/* ============================================================================================= */}
        <ContentContainer>
          <MypageMenuBar setCurrentPage={setCurrentPage}></MypageMenuBar>
          <Box3>{pageRender(currentPage)}</Box3>

          {/* <BoxImg src="/빈박스.png" alt="" /> */}
          {/* <Notice>현재 등록된 정보가 없습니다. </Notice> */}
          {isSignoutModal && <SignOut />}
        </ContentContainer>
      </BoxContainer>
      <Footer />
    </>
  );
}
export default Mypage;
