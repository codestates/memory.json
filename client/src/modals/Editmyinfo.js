import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserAction,
  userinfoAction
} from "../store/actions";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;

const EditArea = styled.div`
  z-index: 999;
  width: 50vmin;
  height: 70vmin;
  min-height: 300px;
  background: #BDBDBD;
  box-shadow: 0 0 15px #333;
  border-radius: 3em;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 0.5vh;
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

const BtnDiv = styled.div`
  width: 100%;
  height: 50px;
  background: #BDBDBD;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  color: #BDBDBD;
  box-sizing: border-box;
  position: relative;
  background-size: contain;
  margin: 30px 0px 0px 0px;
`;

const EditConfirmButton = styled.div`
  width: 60%;
  height: 1vh;
  color: #eee;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 30px 30px 30px 30px;
  background-color: #0E0E0E;
  border-radius: 5em;
  cursor: pointer;

  background: #0E0E0E;
  :hover {
    border: 2px solid #2c394b;
  }
`;

const CancelButton = styled.div`
  width: 60%;
  height: 1vh;
  color: #0E0E0E;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 30px 30px 30px 30px;
  background-color: #eee;
  border-radius: 5em;
  cursor: pointer;
  :hover {
    border: 2px solid #2c394b;
  }
  background: #eee;
`;

const SignoutButton = styled.div`
  width: 60%;
  height: 0.9vh;
  color: #FC0000;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 30px 30px 30px 100px;
  background-color: #E9E9E9;
  border-radius: 5em;
  cursor: pointer;
  :hover {
    border: 2px solid #E9E9E9;
  }
  background: #E9E9E9;
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

// axios ?????? / ???????????? ????????????
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Editmyinfo = ({
  modalCloser,
  mypageModalOpener,
  changeformToMyinfoFromEdit,
  changeformToSignoutFromEdit
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userState = useSelector((state) => state.userinfoReducer);

  // ?????? ?????? ?????? ?????? ????????????
  const {
    address,
    age,
    email,
    id,
    mobile,
    social_id,
    user_account,
    user_name,
  } = userState;

  // ????????????
  const [editInfo, setEditInfo] = useState({
    user_account: userState.user_account,
    exPassword: "",
    password: "",
    checkedPassword: "",
    mobile: userState.mobile,
    email: userState.email,
    age: userState.age,
  });

  console.log(userState.email);

  //???????????? ?????????
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  //??????
  const handleInputAge = (key) => (e) => {
    let ageValue = parseInt(e.target.value);
    setEditInfo({ ...editInfo, [key]: ageValue });
  };

  //input??? ????????? ??????????????? ?????????
  const onResetMobile = () => {
    setEditInfo({ ...editInfo, mobile: "" });
  };

  const onResetEmail = () => {
    setEditInfo({ ...editInfo, email: "" });
  };

  const onResetAge = () => {
    setEditInfo({ ...editInfo, age: "" });
  };

  // ?????? ????????????
  const accessTokenJson = localStorage.getItem("accessToken");
  const accessTokenObject = JSON.parse(accessTokenJson);
  const accessToken = Object.values(accessTokenObject);

  //?????? ???????????? ?????? ????????????
  const passwordState = useSelector((state) => state.authReducer);
  const { password } = passwordState;
  const prsentPassword = password;

  //????????? ?????? ??????
  const [validateError, setValidateError] = useState("");

  // ????????? ??????
  const validateCheck = (inputName) => {
    const passwordCheck =
      /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@ #$%^&+=]).*$/;
    const mobileCheck = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const emailCheck =
      /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;

    let { exPassword, password, checkedPassword, mobile, email } = editInfo;

    if (inputName === "exPassword") {
      if (exPassword !== prsentPassword) return "?????? ??????????????? ?????? ????????????";
    }
    if (inputName === "password") {
      return !passwordCheck.test(password);
    }
    if (inputName === "checkedPassword") {
      if (!passwordCheck.test(password)) {
        return "????????? ??????????????? ??????????????? ?????????.";
      }
      if (passwordCheck.test(password) && password !== checkedPassword) {
        return "??????????????? ?????? ????????????.";
      }
    }
    if (inputName === "mobile") {
      if (!mobileCheck.test(mobile)) {
        return "????????? ?????? ????????? ????????? ??????????????????";
      }
    }
    if (inputName === "email") {
      if (!emailCheck.test(email)) {
        return "????????? ????????? ????????? ??????????????????";
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
        setValidateError("??????????????? ????????? ??????????????? ??????????????? ?????????.");
        if (password === "") {
          return setValidateError("??????????????? ??????????????????");
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
          return setValidateError("??????????????? ?????? ????????????.");
        }
        setValidateError("");
      }
    }
  };
  //---------------------------------------------------------------------------------
  const updateHandler = () => {
    let { password, checkedPassword, age } = editInfo;
    if (password !== checkedPassword) {
      setValidateError("??????????????? ?????? ????????????.");
      return;
    }
    if (typeof age !== "number") {
      setValidateError("????????? ????????? ??????????????????");
      return;
    }
    if (password !== undefined) {
      axios
        .patch(
          `${serverUrl}users`,
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
          console.log("res", res.data.data);
          const userInformation = res.data.data;
          modalCloser();
          mypageModalOpener();
          dispatch(
            userinfoAction(
              userInformation.age,
              userInformation.email,
              userInformation.mobile
            )
          );
          dispatch(getUserAction(editInfo.user_account, editInfo.password));
          alert("???????????? ??????????????? ?????????????????????!");
          navigate("/main");
        })
        .catch((err) => {
          console.log(err);
          setValidateError("???????????? ??????????????? ?????????????????????!");
        });
    } else {
      setValidateError("????????? ??????????????? ??? ?????????????????? !");
    }
  };

  return (
    <ModalArea>
      <EditArea>
        <h1>???????????? ??????</h1>
        {social_id === null ? (
          <div>
            <span>?????? ????????????</span>
            <InputPassword
              type="password"
              name="exPassword"
              onBlur={() => {
                checkedInfo("exPassword");
              }}
              onChange={handleInputValue}
              placeholder="??????????????? ??????????????????"
            />
          </div>
        ) : null}
        {social_id === null ? (
          <div>
            <span>????????? ????????????</span>
            <InputPassword
              type="password"
              name="password"
              onBlur={() => {
                checkedInfo("password");
              }}
              onChange={handleInputValue}
              placeholder="????????? ??????????????? ??????????????????"
            />
          </div>
        ) : null}
        {social_id === null ? (
          <div>
            <span>????????? ???????????? ??????</span>
            <InputPassword
              type="password"
              name="checkedPassword"
              onBlur={() => {
                checkedInfo("checkedPassword");
              }}
              onChange={handleInputValue}
              placeholder="????????? ??????????????? ?????? ??????????????????"
            />
          </div>
        ) : null}
        <div>
          <span>????????? ??????</span>
          <Input
            type="text"
            name="mobile"
            value={editInfo.mobile || ''}
            onClick={onResetMobile}
            onBlur={() => {
              checkedInfo("mobile");
            }}
            onChange={handleInputValue}
            placeholder="????????? ????????? ????????? ?????????????????? ex)010-1234-5678"
          />
        </div>
        <div>
          <span>?????????</span>
          <Input
            type="email"
            name="email"
            value={editInfo.email || ''}
            onClick={onResetEmail}
            onBlur={() => {
              checkedInfo("email");
            }}
            onChange={handleInputValue}
            placeholder="????????? ???????????? ???????????????"
          />
        </div>
        <div>
          <span>??????</span>
          <Input
            type="text"
            name="age"
            value={editInfo.age || ''}
            onClick={onResetAge}
            pattern="^[0-9]+$"
            onChange={handleInputAge("age")}
            placeholder="????????? ?????????????????? ex) 25"
          />
        </div>

        <div style={{ color: "red" }}>{validateError}</div>

        <BtnDiv>
        <EditConfirmButton onClick={() => updateHandler()}>
          ??????
        </EditConfirmButton>
        <CancelButton onClick={changeformToMyinfoFromEdit}>
          ??????
        </CancelButton>
        </BtnDiv>
        <SignoutButton
          onClick={() => {
            changeformToSignoutFromEdit();
          }}
        >
          ??????????????????
        </SignoutButton>
      </EditArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
};
export default Editmyinfo;
