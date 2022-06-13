import React, { useRef, useEffect } from "react";
import * as S from "./Main.style";
import MultipleItems from "../components/Carousel";
import styled from "styled-components";
import MainSlide from "../components/MainSlide";

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
        <video src="img/video.mp4" autoPlay muted loop></video>
        <p>우리들의 추억 저장소</p>
        <h1>Memory.json</h1>
      </S.MainContainer>
      <S.Divider></S.Divider>
      <S.ServiceContainer>
        <MainSection>
          <div className="inner">
            <h1>Features</h1>
            <div className="wrap">
              <article>
                <div className="pic">
                  <img src="img/feature1.png" alt="1번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">위치 기반의 사진 저장</a>
                </h2>
                <p>1번기능소개가 들어가는 공간입니다.</p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/feature2.png" alt="2번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">2번 기능입니다.</a>
                </h2>
                <p>2번기능소개가 들어가는 공간입니다.</p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/feature3.png" alt="3번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">3번 기능입니다.</a>
                </h2>
                <p>3번기능소개가 들어가는 공간입니다.</p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/suwon2.png" alt="4번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">4번 기능입니다.</a>
                </h2>
                <p>4번기능소개가 들어가는 공간입니다.</p>
              </article>
            </div>
          </div>
        </MainSection>
      </S.ServiceContainer>
      <S.Divider></S.Divider>
      <S.ViewContainer></S.ViewContainer>
    </S.OuterDiv>
  );
}

export default Main;

const MainFigure = styled.figure`
  width: 100%;
  height: calc(90vh - 50px);
  background: white;
  position: relative;
  overflow: hidden;
  .inner {
    width: 1180px;
    margin: 0px auto;
    position: relative;
  }
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
  width: 100%;
  padding: 70px 0px;

  .inner {
    width: 1180px;
    margin: 0px auto;
  }

  .inner h1 {
    font: normal 24px/1 "arial";
    color: black;
    text-align: center;
    margin-bottom: 50px;
  }

  .inner .wrap {
    width: 100%;
  }

  .inner .wrap::after {
    content: "";
    display: block;
    clear: both;
  }

  .inner .wrap article {
    width: 280px;
    float: left;
    margin-right: 20px;
  }

  .inner .wrap article:last-child {
    margin-right: 0px;
  }

  .inner .wrap article h2 {
    margin-bottom: 10px;
  }

  .inner .wrap article h2 a {
    font: bold 16px/1 "arial";
    color: #555;
    margin-right: 0px;
    width: 280px;
  }

  .inner .wrap article p {
    font: 14px/1 "arial";
    color: #777;
  }

  .inner .wrap article .pic {
    width: 100%;
    height: 300px;
    background: #333;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
  }

  .inner .wrap article .pic img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .inner a {
    display: block;
    width: 400px;
    height: 30px;
    border: 1px solid #bbb;
    font: bold 11px/30px "arial";
    color: blue;
    text-align: center;
    letter-spacing: 1px;
    transition: all 0.5s;
  }

  .inner a:hover {
    background: #ccc;
    color: #555;
  }
`;

const MainDetail = styled.div`
  width: 100%;
  height: calc(90vh - 50px);
  background: white;
  position: relative;
  overflow: hidden;
`;
