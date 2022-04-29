import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Popup from "../components/Popup";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: 'font-css';
`;

const SignUpArea = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 50vmin;
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
    font-family: 'font-css';
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
  height: 18%;
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
  height: 18%;
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

axios.defaults.withCredentials = true;

function Signup({ changeForm, modalCloser, modalOpener }) {
  const [signupInfo, setSignupInfo] = useState({
    user_name: "",
    user_account: "",
    password: "",
    checkedPassword: "",
    nick_name: "",
    mobile: "",
    user_account: "",
    address: "",
    age: "",
  });
  const [validateErr, setValidateErr] = useState("");
  const [successSignup, setSuccessSignup] = useState(false);

  //로그인 요청을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };
  //회원가입 버튼을 눌렀을때
  const signupHandler = () => {
    let { user_name, user_account, password, nick_name, checkedPassword } =
      signupInfo;
    if (
      user_name &&
      user_account &&
      password &&
      nick_name &&
      !validateErr &&
      checkedPassword === password
    ) {
      axios
        .post("http://localhost:4000/users/signup", signupInfo)
        .then((result) => {
          setSuccessSignup(true);
          modalCloser();
          modalOpener();
          alert("회원가입이 완료되었습니다");
          window.location.replace("/main");
        })
        .catch((err) => {
          console.log(err);
          setValidateErr(
            "이미 가입된 중복된 정보가 있습니다. 확인 후 다시 시도 해주세요."
          );
        });
    }
  };
  const validateCheck = (inputName) => {
    const idCheck =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordCheck =
      /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    let { user_account, password, nick_name, checkedPassword } = signupInfo;

    if (inputName === "nick_name") {
      return nick_name.includes(" ") || nick_name === "";
    }
    if (inputName === "user_account") {
      return !idCheck.test(user_account);
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
  };
  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { password, checkedPassword } = signupInfo;
    if (validate) {
      if (inputName === "nick_name") {
        setValidateErr("닉네임에 공백이 있어선 안됩니다.");
      }

      if (inputName === "user_account") {
        setValidateErr("올바른 아이디를 입력해주세요");
      }

      if (inputName === "checkedPassword") {
        setValidateErr(validate);
      }

      if (inputName === "password") {
        setValidateErr("비밀번호는 숫자와 특수문자가 포함되어야 합니다.");
        if (password === "") {
          return setValidateErr("");
        }
      }
    } else {
      setValidateErr("");
      if (inputName === "nick_name") {
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

  return (
    <ModalArea>
      <SignUpArea>
        <h1>Sign up</h1>
        <div>
          <span>닉네임</span>
          <Input
            type="text"
            onBlur={() => {
              checkedInfo("nick_name");
            }}
            onChange={handleInputValue("nick_name")}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div>
          <span>아이디</span>
          <Input
            type="user_account"
            onBlur={() => {
              checkedInfo("user_account");
            }}
            onChange={handleInputValue("user_account")}
            placeholder="아이디을 입력해주세요"
          />
        </div>
        <div>
          <span>비밀번호 / 확인</span>
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
          <InputPassword
            type="password"
            onBlur={() => {
              checkedInfo("checkedPassword");
            }}
            onChange={handleInputValue("checkedPassword")}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>
        <div style={{ color: "blue" }}>{validateErr}</div>

        <SignUpBtn onClick={signupHandler}>Sign Up</SignUpBtn>

        <SignInBtn
          onClick={() => {
            changeForm();
          }}
        >
          이미 회원이십니다.
        </SignInBtn>
      </SignUpArea>
      <Modalback onClick={() => modalCloser()}></Modalback>
      {successSignup ? <Popup text={`회원가입에 성공하셨습니다.`} /> : null}
    </ModalArea>
  );
}

export default Signup;