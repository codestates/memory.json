import React, { useRef, useEffect } from "react";
import * as S from "./Main.style";
import MultipleItems from "../components/Carousel";
import styled from "styled-components";
import MainSlide from "../components/MainSlide";
import { VscGithub, VscAccount } from "react-icons/vsc";

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

  const circle = document.querySelector("#circle");
  const article = document.querySelectorAll("article");
  for (let el of article) {
    el.addEventListener("mouseenter", (e) => {
      circle.style.animationPlayState = "paused";
    });
    el.addEventListener("mouseleave", (e) => {
      circle.style.animationPlayState = "running";
    });
  }

  return (
    <S.OuterDiv ref={outerDivRef}>
      <S.MainContainer>
        <video src="img/video.mp4" autoPlay muted loop></video>
        <p>우리들의 추억 저장소</p>
        <h1>Memory.json</h1>
      </S.MainContainer>
      <S.Divider></S.Divider>
      <S.ServiceContainer>
        <FeatureSection>
          <div className="inner">
            <h1>Features</h1>
            <div className="wrap">
              <article>
                <div className="pic">
                  <img src="img/feature2.png" alt="1번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">위치 기반의 사진 저장</a>
                </h2>
                <p>
                  카카오맵 api를 이용하여 <br />
                  원하는 위치에 사진을 저장할 수 있습니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/feature3.png" alt="2번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">히스토리 마커</a>
                </h2>
                <p>
                  최대 10장의 사진과 간단한 추억들을
                  <br /> 저장할 수 있습니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/feature4.png" alt="3번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">히스토리</a>
                </h2>
                <p>
                  정확한 장소를 선택하여, 장소를 지정할 수 있습니다.
                  <br />
                  최대 10장의 사진을 선택할 수 있습니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/feature.png" alt="4번째 특징 이미지" />
                </div>
                <h2>
                  <a href="#">프로필</a>
                </h2>
                <p>
                  프로필 사진을 설정하고,
                  <br />
                  작성한글, 좋아요한 글을 확인할 수 있습니다.
                </p>
              </article>
            </div>
          </div>
        </FeatureSection>
      </S.ServiceContainer>
      <S.Divider></S.Divider>
      <S.ViewContainer>
        <TeamSection>
          <div className="inner">
            <h1>Member</h1>
            <div className="wrap">
              <article>
                <div className="pic">
                  <img src="img/member1.png" alt="멤버1" />
                </div>
                <h2>
                  김종진
                  <a href="https://github.com/khakisage">
                    <VscGithub />
                  </a>
                </h2>
                <p>
                  프론트엔드
                  <br />이 페이지에서 구현한 부분 작성하시면 됩니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/member2.png" alt="멤버2" />
                </div>
                <h2>
                  안제호
                  <a href="https://github.com/JELKOV">
                    <VscGithub />
                  </a>
                </h2>
                <p>
                  프론트엔드
                  <br />이 페이지에서 구현한 부분 작성하시면 됩니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/member4.png" alt="멤버3" />
                </div>
                <h2>
                  정종훈
                  <a href="https://github.com/mathisveryfun">
                    <VscGithub />
                  </a>
                </h2>
                <p>
                  백엔드
                  <br />이 페이지에서 구현한 부분 작성하시면 됩니다.
                </p>
              </article>
              <article>
                <div className="pic">
                  <img src="img/member3.png" alt="멤버4" />
                </div>
                <h2>
                  이근수
                  <a href="https://github.com/bluelgs">
                    <VscGithub />
                  </a>
                </h2>
                <p>
                  백엔드
                  <br />이 페이지에서 구현한 부분 작성하시면 됩니다.
                </p>
              </article>
            </div>
          </div>
          <Footer>
            <div className="inner">
              <div className="upper">
                <h1>memory.json</h1>
                <ul>
                  <li>
                    <a href="https://github.com/codestates/memory.json/wiki">
                      wiki
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/codestates/memory.json">
                      repository
                    </a>
                  </li>
                  <li>
                    <a href="https://localhost:4000/api-docs">api-docs</a>
                  </li>
                </ul>
              </div>
              <div className="lower">
                <p>2022 MENV &copy; copyright all right reserved.</p>
              </div>
            </div>
          </Footer>
        </TeamSection>
      </S.ViewContainer>
    </S.OuterDiv>
  );
}

export default Main;

const FeatureSection = styled.section`
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
    text-decoration: none;
    color: inherit;
    text-align: center;
    letter-spacing: 1px;
    transition: all 0.5s;
  }

  .inner a:hover {
    background: #ccc;
    color: #555;
  }
`;

const TeamSection = styled.section`
  width: 100%;
  height: 100vh;
  padding: 0px 0px;

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
    text-decoration: none;
    font: bold 11px/30px "arial";
    color: inherit;
    text-align: center;
    letter-spacing: 1px;
    transition: all 0.5s;
  }

  .inner a:hover {
    background: #ccc;
    color: #555;
  }
`;

const Footer = styled.footer`
  width: 100%;
  border-top: 1px solid #888;
  .inner {
    width: 1180px;
  }
  .inner .upper {
    width: 100%;
    padding-bottom: 10px;
  }
  .inner .upper::after {
    content: "";
    display: block;
    clear: both;
  }
  .inner .upper h1 {
    float: left;
    font: bold 20px/1 "arial";
    margin-top: 20px;
    color: #666;
  }
  .inner .upper ul {
    float: right;
  }
  .inner .upper ul li {
    width: 10vw;
    margin-left: 20px;
    padding: 0px;
    float: left;
  }
  .inner .upper ul li a {
    font: bold 14px/1 "arial";
    width: 100px;
    color: #666;
  }
  .inner .lower {
    width: 100%;
    padding-top: 20px;
  }
  .inner .lower p {
    width: 100%;
    font: 6px/0.5 "arial";
    color: #777;
  }
`;
