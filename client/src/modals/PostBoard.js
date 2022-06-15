import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PopupHistoryAddress from "../components/PopupHistoryAddress";
import PopupDom from "../components/PopupDom";
import Newhistory from "../pages/Newhistory";

const PostBoard = () => {
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  console.log(signinState);

  const navigate = useNavigate();

  // 토큰 가져오기
  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);
  console.log("accessToken", accessToken);

  // 서버로 파일을 전송하기 위해 추가해주는 파일의 상태
  const [postFiles, setPostFiles] = useState({
    file: [],
    previewURL: "",
  });
  // 클라이언트에서 미리보기를 위해 추가한 상태 파일 base64
  // history 정보
  const [historyInfo, setHistoryInfo] = useState({
    history_title: "",
    history_content: "",
    history_year: 0,
  });

  // 주소 정보
  const [address, setAddress] = useState({});
  console.log("address", address)

  const [addressList, setAddressList] = useState([]);
  // 주소 검색 창
  const [addressText, setAddressText] = useState("");
  console.log(addressText);

  // 주소 데이터
  const searchInputAddress = (e) => {
    console.log(e);
    setAddressText(e.target.value);
    // console.log("주소 검색 창", addressText);
  };

  const onReset = () => {
    setAddressText("");
  };

  // 주소 정보 불러오기
  const callAddress = async () => {
    const config = {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_CLIENT_ID}`,
      },
      withCredentials: false,
    };
    // console.log(config);
    const url = `https://dapi.kakao.com/v2/local/search/address.json?analyze_type: similar&query=${addressText}`;
    // console.log(url);
    const res = await axios
      .get(url, config)
      .then((res) => {
        console.log("res", res);
        // console.log(res.data.documents);
        // console.log(res.data.meta.total_count)
        setAddressList([]);
        const addressLength = res.data.meta.total_count;
        const addressArray = res.data.documents;
        if (addressLength >= 0) {
          if (addressLength === 0) {
            alert("해당 지역이 없습니다 다시 검색해주세요");
            return;
          } else {
            for (let n = 0; n < addressLength; n++) {
              setAddressList((prev) => [...prev, addressArray[n]]);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("address", address);
  };

  // 맵을써서 푸쉬를 해서 모든 값을 담은 후에, 그 값을 화면에 띄어준다. 선택할수 있게 만들고 선택받은 텍스트를 값으로 만들어준다.

  const addressSelect = () => {
    console.log("실행");
    console.log("check", addressList);
  };
  useEffect(() => {
    addressSelect();
  }, [addressList]);

  // 히스토리 데이터
  const historyInputValue = (key) => (e) => {
    console.log("key", key);
    console.log("e", e);
    setHistoryInfo({ ...historyInfo, [key]: e.target.value });
  };

  const uploadFile = (e) => {
    // 미리 보기를 위한 FileReader 객체 생성
    e.stopPropagation(); // 이벤트 버블링 현상 방지.
    const reader = new FileReader();
    const file = e.target.files[0];
    const filesInArr = Array.from(e.target.files);
    reader.onloadend = () => {
      setPostFiles({
        file: filesInArr,
        previewURL: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClick = async () => {
    // 서버로 파일 전송을 위한 FormData 객체 생성
    const formData = new FormData();
    console.log("formData", formData);
    postFiles?.file.map((eachFile) => {
      formData.append("formData", eachFile);
    });
    formData.append("historyInfo", JSON.stringify(historyInfo));
    formData.append("placeInfo", JSON.stringify(address));
    // 서버의 upload api 호출
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      `${serverUrl}histories/${address.place_id}`,
      formData,
      config
    );
    console.log("res", res.status);
    if (res.status === 201) {
      alert("히스토리가 등록되었습니다");
      navigate("/board");
    }
  };

  //-------------------------------------------------------------
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  //-------------------------------------------------------------

  return (
    <>
      <Div>
        <span style={{ color: "#ad8b73" }}>제목</span>
        <input
          type={"text"}
          onChange={historyInputValue("history_title")}
          placeholder={"제목을 입력해주세요."}
        ></input>
      </Div>
      <Div>
        <div>
          <span style={{ color: "#ad8b73" }}>장소</span>
          <input
            type={"text"}
            value={addressText}
            placeholder={"주소를 입력해주세요."}
            onChange={searchInputAddress}
          ></input>
          <Button
            onClick={() => {
              callAddress();
              openPostCode();
              onReset();
            }}
          >
            검색
          </Button>
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupHistoryAddress
                  addressList={addressList}
                  onClose={closePostCode}
                  setAddress={setAddress}
                  setAddressText={setAddressText}
                />
              </PopupDom>
            )}
          </div>
        </div>
      </Div>
      <Div>
        <span style={{ color: "#ad8b73" }}>연도</span>
        <input
          type={"number"}
          onChange={historyInputValue("history_year")}
          placeholder={"연도를 입력해주세요.(4자리)"}
        ></input>
      </Div>
      <Div>
        <span style={{ color: "#ad8b73" }}>내용</span>
        <TextArea
          type={"textarea"}
          onChange={historyInputValue("history_content")}
          placeholder={"추억을 적어주세요.(100자 이내)"}
          maxLength={"100"}
        ></TextArea>
      </Div>
      <Div>
        <span style={{ color: "#ad8b73" }}>사진</span>
      </Div>
      <Div className="PostBoard">
        <div
          style={{
            width: "50%",
            height: "auto",
          }}
        >
          <img
            src={postFiles.previewURL}
            alt="img"
            width={"150px"}
            height={"150px"}
          />
        </div>
        <input
          type="file"
          multiple
          onChange={uploadFile}
          style={{ background: "white" }}
        />
        <Button onClick={onClick}>작성</Button>
      </Div>
    </>
  );
};

export default PostBoard;

const Div = styled.div`
  background-color: #f9e4c8;
  width: 90%;
  max-height: 400%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  margin: 5px 1px 5px 1px;
  box-shadow: 3px 3px 2px #826f66;
`;

const TextArea = styled.textarea`
  width: auto;
  height: 150px;
  resize: none;
`;
