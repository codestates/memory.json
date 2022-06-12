import React, { useRef, useEffect } from "react";
import * as S from "./Main.style";
import MultipleItems from "../components/Carousel";

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
    <S.OuterDiv ref={outerDivRef}>
      <S.MainContainer>
        <S.MainSection>
          <S.MainDiv>
            <MultipleItems />
          </S.MainDiv>
        </S.MainSection>
      </S.MainContainer>
      <S.Divider></S.Divider>
      <S.ServiceContainer>
        <S.ServiceSection>
          <S.ServiceDiv>
            <h1>서비스 소개 들어갈 공간</h1>
          </S.ServiceDiv>
        </S.ServiceSection>
      </S.ServiceContainer>
      <S.Divider></S.Divider>
      <S.ViewContainer>
        <S.ViewSection>
          <S.ViewDiv>
            <h1>지도 api를 불러올 공간</h1>
          </S.ViewDiv>
        </S.ViewSection>
      </S.ViewContainer>
    </S.OuterDiv>
  );
}

export default Main;
