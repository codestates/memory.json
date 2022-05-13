import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import useMyhistory from "../components/useMyhistory";

const ModalArea = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "font-css";
`;

const MyhistoryArea = styled.div`
  z-index: 999;
  width: 40vmin;
  height: 90vmin;
  min-height: 400px;
  background: white;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const PageDiv = styled.div`
  width: 40vmin;
  height: 1vh;
  text-align: center;
`;

const Myhistorylist = styled.div`
  width: 60%;
  height: 10vh;
  color: white;
  font-weight: 700;
  font-size: 10px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: 0B0A09;
  border-radius: 5em;
  cursor: pointer;

  background: #008e43;
  :hover {
    border: 2px solid #008e43;
  }
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

// axios 설정 / 전역변수 가져오기
axios.defaults.withCredentials = true;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Myhistory = ({ modalCloser }) => {
  const [page, setPage] = useState(1);
  const { loading, error, historyFeed } = useMyhistory(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    console.log(target);
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "2000px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <ModalArea>
      <MyhistoryArea>
        <h1>My Histories</h1>
        <h2>내가 쓴 게시글</h2>
        {historyFeed === [] ? null : (
          <PageDiv>
            {historyFeed.map((item, i) => (
              <Myhistorylist key={i}>
                <div>글번호:{item.id}</div>
                <div>장소번호:{item.place_id}</div>
                <div>글쓴이:{item.user_id}</div>
                <div>글제목:{item.history_title}</div>
                <div>글내용:{item.history_content}</div>
                <div>해당년도:{item.history_year}</div>
                <div>좋아요 수:{item.favorite_count}</div>
              </Myhistorylist>
            ))}
          </PageDiv>
        )}
        {loading && <p>로딩중입니다...</p>}
        {error && <p>에러가 발생했습니다!</p>}
        <div ref={loader} />
      </MyhistoryArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
};

export default Myhistory;

// 화면에 두개가 뜨는 문제

// css 꾸미기 들어가야 할듯
