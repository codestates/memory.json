import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Signin from "../modals/Signin";
import { FaSignInAlt } from "react-icons/fa";
import MultipleItems from "../components/Carousel";
import Button from "../components/Button";

const DIVIDER = 5;
function Main() {
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  const outerDivRef = useRef();

  return (
    <OuterDiv ref={outerDivRef}>
      <MainContainer>
        <MainSection>
          <MainDiv>
            <MultipleItems />
          </MainDiv>
        </MainSection>
      </MainContainer>
      <Divider></Divider>
      <ServiceContainer>
        <ServiceSection>
          <ServiceDiv>
            <h1>서비스 소개 들어갈 공간</h1>
          </ServiceDiv>
        </ServiceSection>
      </ServiceContainer>
      <Divider></Divider>
      <MapContainer>
        <MapSection>
          <MapDiv>
            <h1>지도 api를 불러올 공간</h1>
          </MapDiv>
        </MapSection>
      </MapContainer>
    </OuterDiv>
  );
}

export default Main;

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
  background-color: #f1ddbf;
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

const ServiceContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
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
  background-color: #f1ddbf;
`;

const ServiceDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 10vw;
  border: 10px solid coral;
`;

// map 페이지 css

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
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
  background-color: #f1ddbf;
`;

const MapDiv = styled.div`
  width: auto;
  height: 80%;
  padding: 5vh 10vw;
  border: 10px solid coral;
`;
