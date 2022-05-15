import styled from "styled-components";

// 스타일컴퍼넌트
const NavArea = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #2c394b;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FirstDiv = styled.div`
  width: 300px;
  height: 50px;
  background-color: transparent;
  margin: 1em 1em 1em 1em;
`;

const ImageLog = styled.img`
  width: 100%;
  height: 50px;
  margin-top: 1%;
  margin-left: 5%;
  margin-bottom: 5%;
  cursor: pointer;
`;

const SecondDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const ThirdDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const FourthDiv = styled.div`
  width: 10%;
  height: 50px;
  margin: 1em 1em 1em 1em;
  background-color: #ff4c29;
  border-radius: 15em;
  cursor: pointer;
`;

const LoginbuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const MypagebuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const BoardbuttonStyle = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export {
  NavArea,
  FirstDiv,
  SecondDiv,
  ThirdDiv,
  FourthDiv,
  ImageLog,
  LoginbuttonStyle,
  MypagebuttonStyle,
  BoardbuttonStyle,
};
