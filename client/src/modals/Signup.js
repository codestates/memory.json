import React, { useState } from "react";
import axios from "axios";
import PopupDom from "../components/PopupDom";
import PopupPostCode from "../components/PopupPostCode";
import styled from "styled-components";

const ModalArea = styled.div`
  z-index: 999;
  position: relative;
  height: 90%;
  text-align: center;
  font-family: "Roboto";
`;

const SignUpArea = styled.div`
  z-index: 999;
  width: 100vmin;
  height: 85vmin;
  min-height: 400px;
  background: #BDBDBD;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  border-radius: 0.5em;
  font-size: 1.0em;
  font-weight: 700;
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
  height: 30px;

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
  height: 30px;

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
const Btndiv = styled.div`
  width: 100%;
  height: 50px;
  background: #BDBDBD;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  margin-top: 60px;
  color: white;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
`;

const SignUpBtn = styled.div`
  z-index: 999;
  height: 45px;
  width: 40%;
  color: #eee;
  font-weight: 700;
  font-size: 20px;
  padding-top: 10px ;
  background-color: #0E0E0E;
  border-radius: 5em;
  cursor: pointer;

  background: #0E0E0E;
  :hover {
    border: 2px solid #0E0E0E;
  }
`;

const SignInBtn = styled.div`
  z-index: 999; 
  height: 45px;
  width: 40%;
  color: #0E0E0E;
  font-weight: 700;
  font-size: 20px;
  padding-top: 10px ;
  background-color: #eee;
  border-radius: 5em;
  cursor: pointer;
  :hover {
    border: 2px solid #eee;
  }
  background: #eee;
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

function Signup({
  modalCloser,
  modalOpener,
  changeformToSignin,
  signupIndicator,
}) {
  //유효성 검사 상태
  const [validateErr, setValidateErr] = useState("");

  //주소 Api
  const [zoneCode, setZoneCode] = useState(""); // zoneCode
  const [addressDetail, setAddressDetail] = useState(""); // 검색주소

  // 글자 유무 상태
  const [text, setText] = useState("");

  // 회원가입 정보
  const [signupInfo, setSignupInfo] = useState({
    user_name: "",
    user_account: "",
    password: "",
    checkedPassword: "",
    mobile: "",
    email: "",
    address: "",
    age: 0,
    sex: "",
  });
  // console.log("signupInfo", signupInfo);

  //회원가입 데이터
  const handleInputValue = (key) => (e) => {
    // console.log("e",e)
    // console.log("key",key)
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  //주소 데이터
  const handleInputAddress = (key) => (e) => {
    let firstAddress = `${addressDetail} ${zoneCode}`;
    let lastAddress = e.target.value;
    setText(e.target.value);
    setSignupInfo({ ...signupInfo, [key]: firstAddress + lastAddress });
  };

  const onReset = () => {
    setText("");
  };

  //나이 데이터
  const handleInputAge = (key) => (e) => {
    // console.log(e.target.value);
    let ageValue = parseInt(e.target.value);
    setSignupInfo({ ...signupInfo, [key]: ageValue });
  };

  const [validateUserAccount, setValidateUserAccount] = useState(false)
  const [validateUserName, setValidateUserName] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false)
  const [validatePasswordCheck, setValidatePasswordCheck] = useState(false)

  // 유효성 검사
  const validateCheck = (inputName) => {
    const idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    const passwordCheck =
      /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@ #$%^&+=]).*$/;
    const mobileCheck = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const emailCheck =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

    let {
      user_account,
      password,
      user_name,
      checkedPassword,
      mobile,
      email,
      sex,
    } = signupInfo;

    if (inputName === "user_account") {
      if (!idCheck.test(user_account)) {
        setValidateUserAccount(false)
        return "영문자로 시작하는 영문자 또는 숫자 6~20자로 해야 합니다.";
      }else{
        setValidateUserAccount(true)
      }
    }
    if (inputName === "user_name") {
      if(user_name.includes(" ") || user_name === ""){
        setValidateUserName(false)
        return "닉네임에 공백이 있거나 비어 있으면 안됩니다.";
      }else{
        setValidateUserName(true)
      };
    }
    if (inputName === "password") {
      if(!passwordCheck.test(password)){
        setValidatePassword(false)
        return "비밀번호는 숫자와 특수문자가 포함된 6~12자리 여야 합니다.";
      }else{
        setValidatePassword(true)
      }
    }
    if (inputName === "checkedPassword") {
      if (!passwordCheck.test(checkedPassword)) {
        return "비밀번호는 숫자와 특수문자가 포함된 6~12자리 여야 합니다.";
      }
      if (password !== checkedPassword && checkedPassword !== "") {
        setValidatePasswordCheck(false)
        return "비밀번호가 같지 않습니다.";
      }else{
        setValidatePasswordCheck(true)
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
    if (inputName === "sex") {
      if (sex !== "F" && sex !== "M") {
        return "성별은 F 또는 M 만 입력할 수 있습니다.";
      }
    }
  };
  //---------------------------------------------------------------------------------

  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { password } = signupInfo;
    if (validate) {
      if (inputName === "user_account") {
        setValidateErr(validate);
      }
      if (inputName === "user_name") {
        setValidateErr(validate);
      }

      if (inputName === "password") {
        setValidateErr(validate);
        if (password === "") {
          return setValidateErr("비밀번호를 입력해주세요");
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
      if (inputName === "sex") {
        setValidateErr(validate);
      }
    } else {
      setValidateErr("");
    }
  };
  //--------------------------------------------------------------------------------- 

  //회원가입 버튼을 눌렀을때 서버 교신
  const signupHandler = () => {
    let { user_name, user_account, password, checkedPassword, age } = signupInfo;
    if(validateUserAccount === false){
      alert("영문자로 시작하는 영문자 또는 숫자 6~20자로 해야 합니다.")
      return;
    }
    if(validateUserName === false){
      alert("닉네임에 공백이 있거나 비어 있으면 안됩니다.")
      return;
    }
    if(validatePassword === false){
      alert("비밀번호는 숫자와 특수문자가 포함된 6~12자리 여야 합니다.")
      return;
    }
    if(validatePasswordCheck === false){
      alert("비밀번호가 같지 않습니다.")
      return;
    }
    if(typeof age !== 'number'){
      alert("나이에 숫자를 입력해주세요");
      return;
    }
    if (user_name && user_account && password !== "") {
      axios
        .post(
          `${serverUrl}users/signup`,
          {
            user_name: signupInfo.user_name,
            user_account: signupInfo.user_account,
            password: signupInfo.password,
            mobile: signupInfo.mobile,
            email: signupInfo.email,
            address: signupInfo.address,
            age: signupInfo.age,
            sex: signupInfo.sex,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // console.log("res", res);
          signupIndicator();
          modalCloser();
          modalOpener();
          alert("회원가입에 성공하셨습니다!");
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err);
          setValidateErr("회원가입에 실패하였습니다!");
        });
    } else {
      alert("아이디, 닉네임, 비밀번호는 반드시 기입해 주시고, 양식에 맞게 기입해 주세요");
    }
  };

  //---------------------------------------------------------------------------------

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
    setZoneCode("");
    setAddressDetail("");
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
    handleInputAddress("address");
  };
  //---------------------------------------------------------------------------------

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
            placeholder="휴대폰 번호를 입력해주세요 ex)010-1234-5678"
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
            value={`${addressDetail} ${zoneCode}`}
            placeholder="주소"
            disabled
          />
          <div>
            {/* 버튼 클릭 시 팝업 생성 */}
            <button
              type="button"
              onClick={() => {
                openPostCode();
                onReset();
              }}
            >
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
          <span>상세 주소</span>
          <Input
            type="text"
            value={text}
            onChange={handleInputAddress("address")}
            placeholder="상세주소를 입력하세요"
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
        <div>
          <span>성별</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo("sex");
            }}
            onChange={handleInputValue("sex")}
            placeholder="성별을 입력해주세요 ex) M / F"
          />
        </div>

        <div style={{ color: "red" }}>{validateErr}</div>
        <Btndiv>
        <SignUpBtn onClick={() => signupHandler()}>
          회원 가입 하기
        </SignUpBtn>

        <SignInBtn onClick={changeformToSignin}>
          이미 회원이신가요?
        </SignInBtn>
        </Btndiv>
      </SignUpArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
}

export default Signup;
