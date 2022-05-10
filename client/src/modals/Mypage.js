import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signoutModalAction, userinfoAction } from "../store/actions";

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

const MyhistoryButton = styled.div`
  width: 60%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 150px;
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
  margin: 20px 40px 30px 150px;
  background-color: #c4ddff;
  border-radius: 5em;
  cursor: pointer;
`;

const ModifiedButton = styled.div`
  width: 30%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 150px;
  background-color: #c4ddff;
  border-radius: 5em;
  cursor: pointer;
`;

const MarginDiv = styled.div`
  display: flex;
`;

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

// ------------------------------------------------------------------------------------------

function Mypage({
  isGoogelLogin,
  isKakaoLogin,
  modalCloser,
  mypageModalOpener,
  changeformToEditmyinfo,
  changeformToMyhistory,
  changeformToMyfavorite,
}) {
  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userinfoReducer);

  const {
    address,
    age,
    email,
    id,
    mobile,
    provider,
    sex,
    social_id,
    user_account,
    user_name,
  } = userState;

  useEffect(() => {
    bringUserinformation();
  }, []);

  const bringUserinformation = () => {
    axios
      .get(`${serverUrl}users`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          const userInformation = res.data.data;
          dispatch(
            userinfoAction(
              userInformation.address,
              userInformation.age,
              userInformation.email,
              userInformation.id,
              userInformation.mobile,
              userInformation.provider,
              userInformation.sex,
              userInformation.social_id,
              userInformation.user_account,
              userInformation.user_name
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 카카오 로그인이나 구글 로그인일 경우에는 소셜 아이디로 보여준다.
  return (
    <ModalArea>
      <MarginDiv>
        <ModalView>
          <div>
            <h1>마이 페이지</h1>
            {social_id === null ? (
              <div>
                <h2
                  style={{
                    color: "black",
                    fontSize: "120%",
                    fontWeight: "700",
                  }}
                >
                  아이디: {user_account}
                </h2>
              </div>
            ) : (
              <div>
                <h2
                  style={{
                    color: "black",
                    fontSize: "120%",
                    fontWeight: "700",
                  }}
                >
                  아이디: {social_id}
                </h2>
              </div>
            )}
            <div>
              <div>
                <h2
                  style={{
                    color: "black",
                    fontSize: "120%",
                    fontWeight: "700",
                  }}
                >
                  닉네임: {user_name}
                </h2>
              </div>
              <MyhistoryButton
                type="button"
                onClick={() => changeformToMyhistory()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              >
                My History
              </MyhistoryButton>
            </div>
            <div>
              <MyfavoriteButton
                type="button"
                onClick={() => changeformToMyfavorite()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              >
                My Favorite
              </MyfavoriteButton>
            </div>
            <div>
              <ModifiedButton
                type="button"
                onClick={() => changeformToEditmyinfo()}
                style={{ color: "white", fontSize: "120%", fontWeight: "700" }}
              >
                내 정보수정
              </ModifiedButton>
            </div>
          </div>
        </ModalView>
        <Modalback onClick={modalCloser}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default Mypage;
