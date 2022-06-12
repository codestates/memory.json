import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { signoutAction, modalOff } from "../store/actions";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;
const Modalback = styled.div`
  z-index: -1;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 80vmin;
  height: 20vmin;
  min-height: 200px;
  background: #696773;
  box-shadow: 0 0 30px #333;
  border-radius: 3em;
  position: fixed;
  margin: 15vh auto;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const Btndiv = styled.div`
  width: 100%;
  height: 50px;
  background: #696773;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
`;

const ConfirmButton = styled.div`
  width: 60%;
  height: 1vh;
  color: #FC0000;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #E9E9E9;
  border-radius: 5em;
  cursor: pointer;

  background: #E9E9E9;
  :hover {
    border: 2px solid #E9E9E9;
  }
`;

const CancelButton = styled.div`
  width: 60%;
  height: 1vh;
  color: #030303;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #E9E9E9;
  border-radius: 5em;
  cursor: pointer;
  :hover {
    border: 2px solid #E9E9E9;
  }
  background: #E9E9E9;
`;

const MarginDiv = styled.div`
  display: flex;
`;

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Signout({ modalCloser, mypageModalOpener }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmSignout = () => {
    const accessTokenJson = localStorage.getItem("accessToken");
    const accessTokenObject = JSON.parse(accessTokenJson);
    const accessToken = Object.values(accessTokenObject);
    axios
      .delete(`${serverUrl}users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        alert("회원탈퇴가 정상적으로 처리되었습니다.");
        dispatch(signoutAction);
        dispatch(modalOff);
        navigate("/");
      });
    localStorage.removeItem("accessToken");
  };

  return (
    <ModalArea>
      <MarginDiv>
        <ModalView>
          <h1>정말로 탈퇴하시겠습니까??</h1>
          <Btndiv>
            <CancelButton
              type="button"
              onClick={() => {
                modalCloser();
                mypageModalOpener();
              }}
            >
              취소
            </CancelButton>
            <ConfirmButton type="button" onClick={confirmSignout}>
              확인
            </ConfirmButton>
          </Btndiv>
        </ModalView>
        <Modalback onClick={modalCloser}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default Signout;
