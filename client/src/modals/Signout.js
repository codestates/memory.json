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
  height: 60vmin;
  min-height: 800px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: 15vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const Input = styled.input`
  font-size: 1.1rem;
  font-weight: normal;
  display: block;

  width: 80%;
  margin-bottom: 0.5rem;
  margin-left: 10%;
  margin-right: 10%;
  height: 45px;

  -webkit-transition: box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: 0.25s linear;
  text-align: center;

  color: black;
  border: 0;
  outline: 0;
  background: #eee;
  box-shadow: 0 0 0 2px transparent;

  &:focus {
    animation: boxShadow 0.3s backwards;

    box-shadow: 0 0 0 2px #c4ddff;
  }
`;

const ConfirmButton = styled.div`
  width: 60%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #c4ddff;
  border-radius: 5em;
  cursor: pointer;

  background: #008e43;
  :hover {
    border: 2px solid #008e43;
  }
`;

const CancelButton = styled.div`
  width: 60%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #c4ddff;
  border-radius: 5em;
  cursor: pointer;
  :hover {
    border: 2px solid #fee518;
  }
  background: #fee518;
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
        alert("회원탈퇴가 정상적으로 처리되었습니다.")
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
        </ModalView>
      </MarginDiv>
    </ModalArea>
  );
}

export default Signout;
