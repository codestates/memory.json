import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import useMyhistory from "../components/useMyhistory";

const ModalArea = styled.div`
  position: absolute;
  height: 100%;
  text-align: center;
  z-index: 999;
  font-family: "Roboto";
`;

const MyhistoryArea = styled.div`
  z-index: 999;
  width: 100vmin;
  height: 70%;
  min-height: 400px;
  background: #DADADA;
  box-shadow: 0 0 15px #333;
  position: fixed;
  margin: -0.9vh auto;
  padding-top: 1vh;
  left: 0;
  right: 0;
  overflow-y: auto;

  .Item {
    width: 550px;
    height: 200px;
    display: flex;
    font-size: 1.2em;
    font-weight: 700;
    text-align: center;
    flex-direction: column;
    background-color: #929398;
    margin: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: 2px solid #2c394b;
    cursor: pointer;

    background: #929398;
    :hover {
      border: 5px solid #2c394b;
    }
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

const Myhistory = ({ modalCloser }) => {
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState(null);
  const { loading, error, historyFeed } = useMyhistory(page);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "350px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    loader.current = observer;
    console.log("넌 누구니", observer);
  }, []);

  useEffect(() => {
    const observer = loader.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

  return (
    <ModalArea>
      <MyhistoryArea>
        <h1>My Histories</h1>
        <h2>내가 쓴 게시글</h2>
        {historyFeed === [] ? null : (
          <div>
            {historyFeed.map((item, i) => (
              <div className="Item" key={i}>
                <div>번호:{item.id}</div>
                <div>글제목:{item.history_title}</div>
                <div>글내용:{item.history_content}</div>
                <div>해당년도:{item.history_year}</div>
                <div>좋아요 수:{item.favorite_count}</div>
              </div>
            ))}
          </div>
        )}
        {loading && <p>로딩중입니다...</p>}
        {error && <p>에러가 발생했습니다!</p>}
        <div ref={setBottom}></div>
      </MyhistoryArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
};

export default Myhistory;
