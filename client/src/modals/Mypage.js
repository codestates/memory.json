import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signoutModalAction } from "../store/actions";

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
  width: 40vmin;
  height: 50vmin;
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

const MyhistoryButton = styled.div`
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
`;

const MyfavoriteButton = styled.div`
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
`;

const ModifiedButton = styled.div`
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
`;

const MarginDiv = styled.div`
  display: flex;
`;

function Mypage({
  modalCloser,
  mypageModalOpener,
  changeformToEditmyinfo,
  changeformToMyhistory,
  changeformToMyfavorite,
}) {

  const[userInformation, SetUserInformation] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    bringUserinformation();
  }, []);

  const bringUserinformation = () =>{
    
  }


  return (
    <ModalArea>
      <MarginDiv>
        <ModalView>
          <div>
            <h1>마이 페이지</h1>
            <div>
              <span>아이디</span>
            </div>
            <div>
              <span>My history</span>
              <MyhistoryButton
                type="button"
                onClick={() => changeformToMyhistory()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              ></MyhistoryButton>
            </div>
            <div>
              <span>My favorite</span>
              <MyfavoriteButton
                type="button"
                onClick={() => changeformToMyfavorite()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              ></MyfavoriteButton>
            </div>
            <div>
              <span>내 정보수정</span>
              <ModifiedButton
                type="button"
                onClick={() => changeformToEditmyinfo()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              ></ModifiedButton>
            </div>
          </div>
        </ModalView>
        <Modalback onClick={modalCloser}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default Mypage;
