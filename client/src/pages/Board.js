import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import MapArea from "../components/Map";
import SearchPlace from "../components/SearchPlace";
import Comment from "../components/Comment";
import { useSelector } from "react-redux";
import Map from "../components/Placemap";

function Board({ modalOpener }) {
  // -------------------------------------------------------------
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;

  const checkedLogin = () => {
    alert("로그인을 해주세요");
    modalOpener();
  };

  const [listComment, setListComment] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let accessToken = "";
  if (localStorage.accessToken) {
    accessToken = JSON.parse(localStorage.accessToken).accessToken;
  }

  const historyId = 1001; // 이건 ishistoryId가 있을 대체해야 함
  const userId = accessToken ? 1007 : ""; // 이건 isUserId가 있을 때 대체해야 함

  console.log(accessToken);

  function registCommentHandler() {
    const comment = document.querySelector("#comment").value;

    axios
      .post(
        `${serverUrl}comments/${historyId}`,
        { comments_content: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        listCommentHandler();
      })
      .catch((err) => console.log(err));
  }

  function deleteCommentHandler(commentId) {
    axios
      .delete(`${serverUrl}comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        listCommentHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeCommentHandler(commentId) {}

  const listCommentHandler = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    if (!accessToken) {
      headers = { "Content-Type": "application/json" };
    }
    axios
      .get(`${serverUrl}comments/${historyId}`, { headers: headers })
      .then((data) => {
        setListComment(data.data.data.listComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function favoriteHandler() {
    if (!accessToken) {
      return alert("회원만 좋아요 할 수 있습니다.");
    }
    axios
      .post(
        `${serverUrl}favorites/${historyId}`,
        { history_id: historyId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => {
        setIsFavorite(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getFavorite = () => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    if (!accessToken) {
      headers = { "Content-Type": "application/json" };
    }
    axios
      .get(`${serverUrl}favorites/${historyId}`, { headers: headers })
      .then((data) => {
        setIsFavorite(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(isFavorite);

  useEffect(() => {
    if (isFavorite.like === undefined) {
      getFavorite();
      listCommentHandler();
    }
  }, []);

  return (
    <div>
      <MapContainer>
        <MapSection>
          <MapDiv>
            {!isSignin ? (
              <Button onClick={checkedLogin}></Button>
            ) : (
              <NavLink to="/Newhistory">
                <Button>New History</Button>
              </NavLink>
            )}
            {/* <SearchPlace></SearchPlace>
          <MapArea></MapArea> */}
            <Map></Map>
          </MapDiv>
        </MapSection>
      </MapContainer>
      {/* ---------------------------------- */}
      <div
        style={{ display: "flex", flexDirection: "column", textAlign: "right" }}
      >
        <div>
          {isFavorite.like === "T" ? (
            <Button style={{ background: "red" }} onClick={favoriteHandler}>
              좋아요
            </Button>
          ) : (
            <Button
              style={{ background: `white`, color: "black" }}
              onClick={favoriteHandler}
            >
              ♥︎
            </Button>
          )}
          <span style={{ padding: "10px", color: "white" }}>
            {isFavorite.like_count}
          </span>
        </div>
        <div>
          <input
            id="comment"
            type="text"
            style={{ width: "500px", height: "50px" }}
            placehoder="여기에 댓글을 작성하세요"
          ></input>
        </div>
        <div>
          {!accessToken ? (
            <Button onClick={registCommentHandler} style={{ display: "none" }}>
              댓글작성
            </Button>
          ) : (
            <Button onClick={registCommentHandler}>댓글작성</Button>
          )}
        </div>
      </div>
      <ul
        style={{
          display: "flex",
          border: "black solid 2px",
          flexDirection: "column",
        }}
      >
        {listComment.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              userId={userId}
              deleteComment={deleteCommentHandler}
              changeComment={changeCommentHandler}
            />
          );
        })}
      </ul>
      {/* ---------------------------------- */}
    </div>
  );
}

export default Board;

const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const MapSection = styled.section`
  width: auto;
  height: 95%;
  padding: 5vh 5vw;
  background-color: #082032;
`;

const MapDiv = styled.div`
  width: auto;
  height: 85%;
  padding: 5vh 5vw;
  border: 5px solid #2c394b;
  background-color: #082032;
  box-shadow: 15px 15px 10px #334756;
`;
