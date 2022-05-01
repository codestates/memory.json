import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Popup from "../components/Popup";
import PopupDom from "../components/PopupDom";
import PopupPostCode from "../components/PopupPostCode";

axios.defaults.withCredentials = true;

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;

const SignUpArea = styled.div`
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

const SignUpBtn = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 5%;
  padding-top: 4%;
  font-size: 2rem;

  cursor: pointer;

  color: black;

  background: #008e43;
  :hover {
    border: 2px solid #008e43;
  }
`;

const SignInBtn = styled.div`
  width: 100%;
  height: 5%;
  padding-top: 4%;
  cursor: pointer;
  font-size: 2rem;

  color: black;
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

function Signup({ changeForm, modalCloser, modalOpener }) {

  const navigate = useNavigate();

  //유효성 검사 상태
  const [validateErr, setValidateErr] = useState("");
  //회원가입 성공 여부
  const [successSignup, setSuccessSignup] = useState(false);
  //주소 Api
  const [zoneCode, setZoneCode] = useState(""); // zoneCode
  const [addressDetail, setAddressDetail] = useState(""); // 검색주소

  // 회원가입 정보
  const [signupInfo, setSignupInfo] = useState({
    user_account: "",
    user_name: "",
    password: "",
    checkedPassword: "",
    mobile: "",
    email: "",
    address: "",
    age: "",
    sex: "",
  });
  console.log("signupInfo", signupInfo);

  //회원가입을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  // 주소를 가져올 데이터
  // const handleInputAddress = (e) => {
  //   setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  // };

  //회원가입 버튼을 눌렀을때
  const signupHandler = () => {
    console.log("handler", signupInfo)
    const isExist_1 = Object.keys(signupInfo).includes('user_account');
    const isExist_2 = Object.keys(signupInfo).includes('password');
    const isExist_3 = Object.keys(signupInfo).includes('user_name');
    if ( isExist_1 && isExist_2 && isExist_3 === true  ) {
      axios
        .post(
          "http://localhost:4000/users/signup", 
          signupInfo,)
        .then((res) => {
          console.log("res",res);
          setSuccessSignup(true);
          modalCloser();
          modalOpener();
          navigate("/main");
        })
        .catch((err) => {
          console.log(err);
          setValidateErr("회원가입에 실패하였습니다!");
        });
    }
  };

  // 유효성 검사
  const validateCheck = (inputName) => {
    const idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    const passwordCheck =
      /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const mobileCheck = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const emailCheck =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

    let { user_account, password, user_name, checkedPassword, mobile, email } =
      signupInfo;

    if (inputName === "user_account") {
      if (!idCheck.test(user_account)) {
        return "영문자로 시작하는 영문자 또는 숫자 6~20자로 해야 합니다.";
      }
    }
    if (inputName === "user_name") {
      return user_name.includes(" ") || user_name === "";
    }
    if (inputName === "password") {
      return !passwordCheck.test(password);
    }
    if (inputName === "checkedPassword") {
      if (!passwordCheck.test(password)) {
        return "숫자와 특수문자가 포함되어야 합니다.";
      }
      if (passwordCheck.test(password) && password !== checkedPassword) {
        return "일치하지 않습니다";
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

  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { password, checkedPassword } = signupInfo;
    if (validate) {
      if (inputName === "user_account") {
        setValidateErr(validate);
      }

      if (inputName === "user_name") {
        setValidateErr("닉네임에 공백이 있어선 안됩니다.");
      }

      if (inputName === "password") {
        setValidateErr("비밀번호는 숫자와 특수문자가 포함되어야 합니다.");
        if (password === "") {
          return setValidateErr("");
        }
      }

      if (inputName === "checkedPassword") {
        setValidateErr(validate);
      }

      if (inputName === "mobile") {
        setValidateErr(validate);
      }

      if (inputName === "email") {
        setValidateErr(validate);
      }
    } else {
      setValidateErr("");
      if (inputName === "user_name") {
        axios
          .get("")
          .then((ok) => setValidateErr(""))
          .catch((err) => setValidateErr("중복된 닉네임 입니다."));
      }

      if (inputName === "user_account") {
        axios
          .get("")
          .then((ok) => setValidateErr(""))
          .catch((err) => setValidateErr("중복된 아이디 입니다."));
      }
      if (inputName === "password") {
        if (password !== checkedPassword && checkedPassword !== "") {
          return setValidateErr("비밀번호가 일치하지 않습니다");
        }
        setValidateErr("");
      }
    }
  };

  //---------------------------------------------------------------------------------

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

  return (
    <ModalArea>
      <SignUpArea>
        <h1>회원가입</h1>
        <div>
          <span>아이디(필수)</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo("user_account");
            }}
            onChange={handleInputValue("user_account")}
            placeholder="아이디을 입력해주세요"
          />
        </div>
        <div>
          <span>닉네임(필수)</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo("user_name");
            }}
            onChange={handleInputValue("user_name")}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div>
          <span>비밀번호(필수)</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("password");
            }}
            onChange={handleInputValue("password")}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div>
          <span>비밀번호 확인(필수)</span>
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("checkedPassword");
            }}
            onChange={handleInputValue("checkedPassword")}
            placeholder="비밀번호를 다시 입력해주세요"
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
            placeholder="휴대폰 번호를 입력해주세요 ex)010-XXXX-XXXX"
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
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <span>주소</span>
          <Input
            type="text"
            name="address"
            value={`${addressDetail} ${zoneCode}`}
            // onChange={handleInputAddress()}
            placeholder="주소"
            readOnly
          />
          <div>
            {/* 버튼 클릭 시 팝업 생성 */}
            <button type="button" onClick={openPostCode}>
              우편번호 검색
            </button>
            {/* 팝업 div */}
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode
                    onClose={closePostCode}
                    setZoneCode={setZoneCode}
                    setAddressDetail={setAddressDetail}
                  />
                </PopupDom>
              )}
            </div>
          </div>
        </div>
        <div>
          <span>나이</span>
          <Input
            type="number"
            onChange={handleInputValue("age")}
            placeholder="나이를 입력해주세요 ex) 25"
          />
        </div>
        <div>
          <span>성별</span>
          <Input
            type="text"
            onChange={handleInputValue("sex")}
            placeholder="성별을 입력해주세요 ex) M / F"
          />
        </div>

        <div style={{ color: "red" }}>{validateErr}</div>
        
        <SignUpBtn onClick={() => signupHandler()}>회원 가입 하기</SignUpBtn>
        
        <SignInBtn
          onClick={() => {
            changeForm();
          }}
        >
          이미 가입하셨다면 여기를 눌러주세요.
        </SignInBtn>
      </SignUpArea>
      
      <Modalback onClick={() => modalCloser()}></Modalback>
      {successSignup ? <Popup text={`회원가입에 성공하셨습니다.`} /> : null}
    </ModalArea>
  );
}

export default Signup;

// 해결해야 하는부분

// 주소 부분 e.target  readonly 부분을 어떻게 잡아내야 하는지 ...

// axios
// 소셜 회원가입
// 닉네임 중복 알려주기

