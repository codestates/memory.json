import React, { useState } from "react";
import axios from "axios";
import PopupDom from "../components/PopupDom";
import PopupPostCode from "../components/PopupPostCode";
import * as S from "./Singup.style";

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
  console.log("signupInfo", signupInfo);

  //회원가입을 보낼 데이터
  const handleInputValue = (key) => (e) => {
    // console.log("e",e)
    // console.log("key",key)
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  //주소를 가져올 데이터
  const handleInputAddress = (key) => (e) => {
    let firstAddress = `${addressDetail} ${zoneCode}`;
    let lastAddress = e.target.value;
    let allAddress = firstAddress + lastAddress;
    setSignupInfo({ ...signupInfo, [key]: allAddress });
  };

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
    if (inputName === "sex") {
      if (sex !== "F" && sex !== "M") {
        return "성별은 F 또는 M 만 입력할 수 있습니다.";
      }
    }
  };
  //---------------------------------------------------------------------------------

  const checkedInfo = (inputName) => {
    let validate = validateCheck(inputName);
    let { user_name, user_account, password, checkedPassword } = signupInfo;
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
      if (inputName === "sex") {
        setValidateErr(validate);
      }
    } else {
      setValidateErr("");
      if (inputName === "password") {
        if (password !== checkedPassword && checkedPassword !== "") {
          return setValidateErr("비밀번호가 일치하지 않습니다");
        }
        setValidateErr("");
      }

      // if (inputName === "user_name") {
      //   axios
      //     .get(`${serverUrl}users/?user_name=${user_name}`)
      //     .then((ok) => setValidateErr(""))
      //     .catch((err) => setValidateErr("중복된 닉네임 입니다."));
      // }

      // if (inputName === "user_account") {
      //   axios
      //     .get(`${serverUrl}users/?user_account=${user_account}`)
      //     .then((ok) => setValidateErr(""))
      //     .catch((err) => setValidateErr("중복된 아이디 입니다."));
      // }
    }
  };
  //---------------------------------------------------------------------------------

  //회원가입 버튼을 눌렀을때 서버 교신
  const signupHandler = () => {
    let { user_name, user_account, password, checkedPassword } = signupInfo;
    if (password !== checkedPassword) {
      setValidateErr("아이디와 비밀번호가 같지 않습니다.");
      return;
    }
    if (user_name && user_account && password !== undefined) {
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
          console.log("res", res);
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
      setValidateErr("아이디, 닉네임, 비밀번호는 반드시 기입해주세요");
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
    <S.ModalArea>
      <S.SignUpArea>
        <h1>회원가입</h1>
        <div>
          <span>아이디(필수)</span>
          <S.Input
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
          <S.Input
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
          <S.InputPassword
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
          <S.InputPassword
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
          <S.Input
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
          <S.Input
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
          <S.Input
            type="text"
            value={`${addressDetail} ${zoneCode}`}
            placeholder="주소"
            disabled
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
          <span>상세 주소</span>
          <S.Input
            type="text"
            onChange={handleInputAddress("address")}
            placeholder="상세주소를 입력하세요"
          />
        </div>
        <div>
          <span>나이</span>
          <S.Input
            type="number"
            min="0"
            max="100"
            onChange={handleInputValue("age")}
            placeholder="나이를 입력해주세요 ex) 25"
          />
        </div>
        <div>
          <span>성별</span>
          <S.Input
            type="text"
            onBlur={() => {
              checkedInfo("sex");
            }}
            onChange={handleInputValue("sex")}
            placeholder="성별을 입력해주세요 ex) M / F"
          />
        </div>

        <div style={{ color: "red" }}>{validateErr}</div>

        <S.SignUpBtn onClick={() => signupHandler()}>
          회원 가입 하기
        </S.SignUpBtn>

        <S.SignInBtn onClick={changeformToSignin}>
          이미 회원이신가요?
        </S.SignInBtn>
      </S.SignUpArea>
      <S.Modalback onClick={modalCloser}></S.Modalback>
    </S.ModalArea>
  );
}

export default Signup;

