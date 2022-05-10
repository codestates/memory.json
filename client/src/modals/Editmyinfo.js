import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAction } from "../store/actions";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;

const EditArea = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 90vmin;
  min-height: 400px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const Input = styled.input`
  ::placeholder {
    font-size: 1.1rem;
  }
  font-size: 1.1em;
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

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const InputPassword = styled.input`
  font-size: 1.1em;
  font-weight: normal;
  font-family: Arial;
  display: block;
  ::placeholder {
    font-family: "font-css";
  }

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

    box-shadow: 0 0 0 2px #008e43;
  }
`;

const EditConfirmButton = styled.div`
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

const Modalback = styled.div`
  z-index: 900;
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

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Editmyinfo = ({
  isGoogelLogin,
  isKakaoLogin,
  modalCloser,
  mypageModalOpener,
  changeformToMyinfoFromEdit,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 토큰 가져오기
  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  //현재 비밀번호 상태 가져오기
  const passwordState = useSelector((state) => state.authReducer);
  const { password } = passwordState;
  const prsentPassword = password;

  //유효성 검사 상태
  const [validateError, setValidateError] = useState("");

  // 수정정보
  const [editInfo, setEditInfo] = useState({
    exPassword: "",
    password: "",
    checkedPassword: "",
    mobile: "",
    email: "",
    age: 0,
  });

  //회원수정 데이터
  const handleInputValue = (key) => (e) => {
    setEditInfo({ ...editInfo, [key]: e.target.value });
  };

  //나이 데이터
  const handleInputAge = (key) => (e) => {
    console.log(e.target.value);
    let ageValue = parseInt(e.target.value);
    setEditInfo({ ...editInfo, [key]: ageValue });
  };

  // 유효성 검사
  const validateCheck = (inputName) => {
    const passwordCheck =
      /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@ #$%^&+=]).*$/;
    const mobileCheck = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const emailCheck =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

    let { exPassword, password, checkedPassword, mobile, email } = editInfo;

    if (inputName === "exPassword") {
      if (exPassword !== prsentPassword) return "현재 비밀번호가 같지 않습니다";
    }
    if (inputName === "password") {
      return !passwordCheck.test(password);
    }
    if (inputName === "checkedPassword") {
      if (!passwordCheck.test(password)) {
        return "숫자와 특수문자가 포함되어야 합니다.";
      }
      if (passwordCheck.test(password) && password !== checkedPassword) {
        return "비밀번호가 같지 않습니다.";
      }
    }
    if (inputName === "mobile") {
      if (!mobileCheck.test(mobile)) {
        return "휴대폰 번호 양식에 맞춰서 입력해주세요";
      }
    }
    if (inputName === "email") {
      if (!emailCheck.test(email)) {
        return "이메일 양식에 맞춰서 입력해주세요";
      }
    }
  };
  //---------------------------------------------------------------------------------

  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { password, checkedPassword } = editInfo;
    if (validate) {
      if (inputName === "exPassword") {
        setValidateError(validate);
      }
      if (inputName === "password") {
        setValidateError("비밀번호는 숫자와 특수문자가 포함되어야 합니다.");
        if (password === "") {
          return setValidateError("비밀번호를 입력해주세요");
        }
      }
      if (inputName === "checkedPassword") {
        setValidateError(validate);
      }

      if (inputName === "mobile") {
        setValidateError(validate);
      }

      if (inputName === "email") {
        setValidateError(validate);
      }
    } else {
      setValidateError("");
      if (inputName === "password") {
        if (password !== checkedPassword && checkedPassword !== "") {
          return setValidateError("비밀번호가 같지 않습니다.");
        }
        setValidateError("");
      }
    }
  };
  //---------------------------------------------------------------------------------
  const updateHandler = () => {
    let { password, checkedPassword, age } = editInfo;
    if (password !== checkedPassword) {
      setValidateError("비밀번호가 같지 않습니다.");
      return;
    }
    if (typeof age !== "number") {
      setValidateError("나이에 숫자를 입력해주세요");
      return;
    }
    if (password !== undefined) {
      axios
        .patch(
          `${serverUrl}users/signup`,
          {
            password: editInfo.password,
            mobile: editInfo.mobile,
            email: editInfo.email,
            age: editInfo.age,
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          console.log("res", res);
          modalCloser();
          mypageModalOpener();
          alert("회원정보 업데이트가 성공하였습니다!");
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err);
          setValidateError("회원정보 업데이트가 실패하였습니다!");
        });
    } else {
      setValidateError("새로운 비밀번호는 꼭 입력해주세요 !");
    }
  };

  return (
    <ModalArea>
      <EditArea>
        <h1>회원정보 수정</h1>
        <div>
          <span>현재 비밀번호</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("exPassword");
            }}
            onChange={handleInputValue("exPassword")}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div>
          <span>새로운 비밀번호</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("password");
            }}
            onChange={handleInputValue("password")}
            placeholder="새로운 비밀번호를 입력해주세요"
          />
        </div>
        <div>
          <span>새로운 비밀번호 확인</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("checkedPassword");
            }}
            onChange={handleInputValue("checkedPassword")}
            placeholder="새로운 비밀번호를 다시 입력해주세요"
          />
        </div>
        <div>
          <span>휴대폰 번호</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo("mobile");
            }}
            onChange={handleInputValue("mobile")}
            placeholder="새로운 휴대폰 번호를 입력해주세요 ex)010-1234-5678"
          />
        </div>
        <div>
          <span>이메일</span>
          <Input
            type="email"
            onBlur={() => {
              checkedInfo("email");
            }}
            onChange={handleInputValue("email")}
            placeholder="새로운 이메일을 입력하세요"
          />
        </div>
        <div>
          <span>나이</span>
          <Input
            type="text"
            pattern="^[0-9]+$"
            onChange={handleInputAge("age")}
            placeholder="나이를 입력해주세요 ex) 25"
          />
        </div>

        <div style={{ color: "red" }}>{validateError}</div>

        <EditConfirmButton onClick={() => updateHandler()}>
          회원정보 수정확인
        </EditConfirmButton>
        <CancelButton onClick={changeformToMyinfoFromEdit}>
          취소하고 마이페이지 돌아가기
        </CancelButton>
      </EditArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
};
export default Editmyinfo;
