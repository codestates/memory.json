import React from "react";
import styled from "styled-components";
import Signin from "../modals/Signin";
import { FaSignInAlt } from "react-icons/fa";
import MultipleItems from "../components/Carousel";
import Button from "../components/Button";

// main 화면 css
const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.header`
  width: auto;
  height: 5%;
  padding: 1vh 5vw;
  display: flex;
  border: 10px solid pink;
  flex-direction: row;
  justify-content: space-between;
`;

const MainSection = styled.section`
  width: auto;
  height: 95%;
  padding: 5vh 5vw;
  border: 10px solid yellow;
`;

const MainNav = styled.nav`
  border: 10px solid skyblue;
`;

const MainDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 5vw;
  border: 10px solid coral;
`;

// service 소개 페이지 css

const ServiceContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
`;

const ServiceHeader = styled.header`
  width: auto;
  height: 5%;
  padding: 1vh 10vw;
  display: flex;
  border: 10px solid pink;
`;

const ServiceSection = styled.section`
  width: auto;
  height: 100%;
  padding: 5vh 10vw;
  border: 10px solid yellow;
`;

const ServiceDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 10vw;
  border: 10px solid coral;
`;

// map 페이지 css

const MapContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
`;

const MapHeader = styled.header`
  width: auto;
  height: 5%;
  padding: 1vh 10vw;
  display: flex;
  border: 10px solid pink;
`;

const MapSection = styled.section`
  width: auto;
  height: 100%;
  padding: 5vh 10vw;
  border: 10px solid yellow;
`;

const MapDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 10vw;
  border: 10px solid coral;
`;

function Main() {
  return (
    <div>
      <MainContainer>
        <MainHeader>
          <img src="img/headerlogo.jpeg" alt="header logo"></img>
          <MainNav>
            <ul>
              <FaSignInAlt />
            </ul>
          </MainNav>
        </MainHeader>
        <MainSection>
          <MainDiv>
            <MultipleItems />
          </MainDiv>
        </MainSection>
      </MainContainer>
      <ServiceContainer>
        <ServiceHeader>
          <img src="img/headerlogo.jpeg" alt="header logo"></img>
        </ServiceHeader>
        <ServiceSection>
          <ServiceDiv>
            <h1>서비스 소개 들어갈 공간</h1>
          </ServiceDiv>
        </ServiceSection>
      </ServiceContainer>
      <MapContainer>
        <MapHeader>
          <img src="img/headerlogo.jpeg" alt="header logo"></img>
        </MapHeader>
        <MapSection>
          <MapDiv>
            <h1>지도 api를 불러올 공간</h1>
          </MapDiv>
        </MapSection>
      </MapContainer>
    </div>
  );
}

export default Main;
