import styled from "styled-components";

const ModalArea = styled.div`
  z-index: 999;
  position: relative;
  height: 100%;
  text-align: center;
  font-family: "Roboto";
`;

const SignUpArea = styled.div`
  z-index: 999;
  width: 80vmin;
  height: 90vmin;
  min-height: 400px;
  background: #BDBDBD;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  border-radius: 0.5em;
  font-size: 1.3em;
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

export {
  ModalArea,
  SignUpArea,
  Input,
  InputPassword,
  Btndiv,
  SignInBtn,
  SignUpBtn,
  Modalback,
};
