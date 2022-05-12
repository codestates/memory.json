import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import useFetch from "../components/useFetch";

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

const EditConfirmButton = styled.div`
  width: 60%;
  height: 1vh;
  color: white;
  font-weight: 700;
  font-size: 20px;
  padding: 10px 10px 20px 10px;
  margin: 20px 40px 30px 70px;
  background-color: #c4ddff;
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
  const { loading, error, historyFeed } = useFetch(page);
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
      rootMargin: "200px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <ModalArea>
      <MyhistoryArea>
        <h1>My Histories</h1>
        <h2>글 목록</h2>
        <div>
          {historyFeed.map((item, i) => (
            <div key={i}>
              {item.id} {item.place_id} {item.user_id} {item.history_title}{" "}
              {item.history_content} {item.history_year} {item.favorite_count}{" "}
            </div>
          ))}
        </div>
        {loading && <p>로딩중입니다...</p>}
        {error && <p>에러가 발생했습니다!</p>}
        <div ref={loader} />
      </MyhistoryArea>
      <Modalback onClick={modalCloser}></Modalback>
    </ModalArea>
  );
};

export default Myhistory;
