import styled from "styled-components";

const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: gray;
`;

const OuterDiv = styled.div`
  height: 100vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

// main 화면 css
const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
  h1 {
    font: normal 120px/1 "arial";
    color: #111;
    margin-bottom: 20px;
  }
  p {
    font: 36px/1.4 "arial";
    color: #111;
    margin-bottom: 60px;
  }
  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    position: absolute;
    top: 0px;
    left: 0px;
  }
`;

const MainSection = styled.section`
  width: auto;
  height: 95%;
  padding: 5vh 5vw;
  background-color: white;
`;

const MainDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 5vw;
  border: 5px solid #2c394b;
  background-color: white;
  box-shadow: 15px 15px 10px #334756;
`;

// service 소개 페이지 css

const ServiceContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
`;

const ServiceSection = styled.section`
  width: 70%;
  height: 100%;
  padding: 5vh 10vw;
  background-color: white;
`;

const ServiceDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 5vw;
  border: 5px solid #2c394b;
  background-color: white;
  box-shadow: 15px 15px 10px #334756;
`;

// map 페이지 css

const ViewContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
`;

const ViewSection = styled.section`
  width: auto;
  height: 100%;
  padding: 5vh 10vw;
  background-color: white;
`;

const ViewDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 10vw;
  border: 5px solid #2c394b;
  background-color: white;
  box-shadow: 15px 15px 10px #334756;
`;

export {
  Divider,
  OuterDiv,
  MainContainer,
  MainDiv,
  MainSection,
  ServiceContainer,
  ServiceDiv,
  ServiceSection,
  ViewContainer,
  ViewDiv,
  ViewSection,
};
