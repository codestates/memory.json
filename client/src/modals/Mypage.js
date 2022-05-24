import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
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

const FirstButtonWrapper = styled.div`
  display: flex;
  flex-direction: rows;
  max-height: 160px;
  justify-content: space-evenly;
  border-top: 5px solid #333;
  border-bottom: 5px solid #333;
`;

const Background = styled.article`
  background: #265353;
  width: max-content;
  padding: 30px;
`;

const Wrapper = styled.div`
  min-width: 300px;
  border-radius: 32px;
  padding: 15px;
  background: white;
  box-shadow: 0px 2px 20px hsl(248deg 53% 40%);
  text-align: center;
`;

const ImageDiv = styled.div`
  max-width: 150px;
  min-height: 150px;
  object-fit: cover;
  background-color: #fafafa;
  border: 5px solid #265353;
  border-radius: 5em;

  &:hover {
    transform: scale(1.05);
    overflow: hidden;
    cursor: pointer;
  }
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

const ModifiedButton = styled.aside`
  width: 150px;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin-top: 50px;
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
    cursor: pointer;
  }
`;

const SecondButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
  margin-top: 3%;
  border-bottom: 5px solid #333;
`;

const MyhistoryButton = styled.aside`
  width: 50%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 100px;
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
  width: 50%;
  height: 1vh;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 100px;
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

  const { social_id, user_account, user_name, user_image } = userState;

  console.log(user_image)
  // 프로필 사진

  // useRef 사용해서 파일 업로드 띄우기
  const fileInput = useRef(null);

  const [image, setImage] = useState("../img/avartarimage.jpg");
  console.log("image", image);

  const profileImageHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(reader);
    reader.addEventListener("load", function () {
      console.log(this.result)
      setImage(this.result);
    });
    reader.readAsDataURL(file);
  };

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
          console.log(userInformation)
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
              userInformation.user_name,
              userInformation.user_image
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // 내가 받은 좋아요 수 표현
    // useEffect(() => {
    //   bringUserFavorite();
    // }, []);
    // const bringUserFavorite = () => {
    //   axios
    //   get
    // }
  };

  return (
    <ModalArea>
      <MarginDiv>
        <ModalView>
          <div>
            <h1>My Page</h1>
            <FirstButtonWrapper>
              <ImageDiv>
                <input
                  type="file"
                  id="img"
                  accept="image/jpg,impge/png,image/jpeg"
                  style={{ display: "none" }}
                  ref={fileInput}
                  onChange={profileImageHandler}
                />
                <img
                  alt="profile"
                  onClick={() => fileInput.current.click()}
                  src={image}
                  width="150"
                  height="150"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                ></img>
              </ImageDiv>
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
                        닉네임: {user_name}
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
                        닉네임: {user_name}
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
            </FirstButtonWrapper>
            <SecondButtonWrapper>
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
            </SecondButtonWrapper>
          </div>
        </ModalView>
        <Modalback onClick={modalCloser}></Modalback>
      </MarginDiv>
    </ModalArea>
  );
}

export default Mypage;
