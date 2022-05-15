import styled from "styled-components";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userinfoAction } from "../store/actions";

const ModalArea = styled.div`
  z-index: 999;
  position: relative;
  height: 100%;
  text-align: center;
  font-family: "Roboto";
`;
const Modalback = styled.div`
  z-index: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  place-items: center;
`;

const ModalView = styled.div`
  z-index: 999;
  width: 100vmin;
  height: 50vmin;
  min-height: 700px;
  background: #696773;
  box-shadow: 0 0 30px #333;
  border-radius: 3em;
  position: fixed;
  margin: 15vh auto;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const Background = styled.article`
  background: #265353;
  width: max-content;
  padding: 30px;
  margin-left: 40px; ;
`;

const Wrapper = styled.div`
  min-width: 300px;
  border-radius: 32px;
  padding: 24px;
  background: white;
  box-shadow: 0px 2px 20px hsl(248deg 53% 40%);
  text-align: center;
`;

const IdDiv = styled.div`
  font-size: 1.85rem;
  font-weight: 600;
  margin-bottom: 0px;
`;

const NickDiv = styled.div`
  font-size: 1.25rem;
  font-weight: 300;
  color: hsl(0deg 0% 40%);
`;

const MyhistoryButton = styled.aside`
  width: 30%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  background-color: #fafafa;
  border: 5px solid #265353;
  border-radius: 5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const MyfavoriteButton = styled.aside`
  width: 30%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  background-color: #fafafa;
  border: 5px solid #265353;
  border-radius: 5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const ModifiedButton = styled.aside`
  width: 30%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  background-color: #fafafa;
  border: 5px solid #265353;
  border-radius: 5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
  }
`;

const MarginDiv = styled.div`
  display: flex;
`;

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

// ------------------------------------------------------------------------------------------

function Mypage({
  modalCloser,
  changeformToEditmyinfo,
  changeformToMyhistory,
  changeformToMyfavorite,
}) {
  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userinfoReducer);

  const { social_id, user_account, user_name } = userState;

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
            <h1>My Page</h1>
            {social_id === null ? (
              <Background>
                <Wrapper>
                  <IdDiv>
                    <h2
                      style={{
                        color: "black",
                        fontSize: "100%",
                        fontWeight: "500",
                        margin: "0px",
                      }}
                    >
                      ID: {user_account}
                    </h2>
                  </IdDiv>
                  <NickDiv>
                    <h2
                      style={{
                        color: "black",
                        fontSize: "100%",
                        fontWeight: "500",
                        margin: "0px",
                      }}
                    >
                      NickName: {user_name}
                    </h2>
                  </NickDiv>
                </Wrapper>
              </Background>
            ) : (
              <Background>
                <Wrapper>
                  <IdDiv>
                    <h2
                      style={{
                        color: "black",
                        fontSize: "100%",
                        fontWeight: "500",
                        margin: "0px",
                      }}
                    >
                      ID: {social_id}
                    </h2>
                  </IdDiv>
                  <NickDiv>
                    <h2
                      style={{
                        color: "black",
                        fontSize: "100%",
                        fontWeight: "500",
                        margin: "0px",
                      }}
                    >
                      NickName: {user_name}
                    </h2>
                  </NickDiv>
                </Wrapper>
              </Background>
            )}
            <ModifiedButton
              type="button"
              onClick={() => changeformToEditmyinfo()}
              style={{
                color: "#28282A",
                fontSize: "120%",
                fontWeight: "700",
              }}
            >
              내 정보 수정
            </ModifiedButton>
            <MyhistoryButton
              type="button"
              onClick={() => changeformToMyhistory()}
              style={{
                color: "#28282A",
                fontSize: "120%",
                fontWeight: "700",
              }}
            >
              My History
            </MyhistoryButton>
            <MyfavoriteButton
              type="button"
              onClick={() => changeformToMyfavorite()}
              style={{
                color: "#28282A",
                fontSize: "120%",
                fontWeight: "700",
              }}
            >
              My Favorite
            </MyfavoriteButton>
          </div>
        </ModalView>
        <Modalback onClick={modalCloser}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default Mypage;
