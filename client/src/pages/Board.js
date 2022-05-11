import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import MapArea from "../components/Map";
import SearchPlace from "../components/SearchPlace";
import Comment from "../components/Comment"

function Board() {
  // -------------------------------------------------------------
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const accessToken = JSON.parse(localStorage.accessToken).accessToken
  const [listComment, setListComment] = useState([])
  const [isFavorite, setIsFavorite] = useState({})
  const historyId = 1001 // 이건 ishistoryId가 있을 대체해야 함

  function registCommentHandler() {
    const comment =document.querySelector('#comment').value;

    axios.post(`${serverUrl}comments/${historyId}`,
      {comments_content: comment},
      {headers: { "Content-Type": "application/json" , Authorization: `Bearer ${accessToken}`},}
    ).then(res => {
      listCommentHandler()
    }).catch(err=>console.log(err))
  }

  function deleteCommentHandler(commentId) {

    axios.delete(`${serverUrl}comments/${commentId}`,
      {headers: { "Content-Type": "application/json" , Authorization: `Bearer ${accessToken}`},}
    ).then(res =>{
      listCommentHandler()
    }).catch(err=>{console.log(err)})
  }

  function changeCommentHandler(commentId) {

  }

  const listCommentHandler = () => {
    axios.get(`${serverUrl}comments/${historyId}`,
      {headers: { "Content-Type": "application/json" , Authorization: `Bearer ${accessToken}`},}
    ).then(data=>{
      setListComment(data.data.data.listComment)
    }).catch(err=>{console.log(err)})
  }

  function favoriteHandler(){
    axios.post(`${serverUrl}favorites/${historyId}`,{history_id: historyId},
    {headers: { "Content-Type": "application/json" , Authorization: `Bearer ${accessToken}`},}
    ).then(data => {
      setIsFavorite(data.data.data)
    }).catch(err=>{console.log(err)})
  }

  function getFavorite(){
    axios.get(`${serverUrl}favorites/${historyId}`,
    {headers: { "Content-Type": "application/json" , Authorization: `Bearer ${accessToken}`},}
    ).then(data => {
      setIsFavorite(data.data.data)
    }).catch(err=>{console.log(err)})
  }

  if(isFavorite.like === undefined) {
    listCommentHandler()
    getFavorite()
  }

  useEffect(()=>{
  },[listComment,isFavorite])
  
  
// -------------------------------

  return (
    <div>
    <MapContainer>
      <MapSection>
        <MapDiv>
          <NavLink to="/Newhistory">
            <Button>New History</Button>
          </NavLink>
          <SearchPlace></SearchPlace>
          <MapArea></MapArea>
        </MapDiv>
      </MapSection>
    </MapContainer>
    {/* ---------------------------------- */}
    <div style={{display:'flex', flexDirection:'column', textAlign:'right'}}>
      <div>
        {isFavorite.like === 'T'
        ? <Button style={{background:'red'}}onClick={favoriteHandler}>좋아요</Button>
        : <Button style={{background:`white`,color:'black'}}onClick={favoriteHandler}>♥︎</Button> 
      }
        <span style={{padding:'10px',color:'white'}}>{isFavorite.like_count}</span>
      </div>
      <div>
        <input id='comment' type='text' style={{width:'500px',height:'50px'}} placehoder="여기에 댓글을 작성하세요"></input>
      </div>
      <div>
        <Button onClick={registCommentHandler}>댓글작성</Button>
        <Button onClick={(e)=>listCommentHandler(historyId)}>댓글조회</Button>
      </div>
    </div>
    <ul style={{display:'flex', border:'black solid 2px',flexDirection:'column'}}>
      {listComment.map((comment)=>{
        return <Comment 
          key={comment.id} 
          comment={comment} 
          deleteComment={deleteCommentHandler} 
          changeComment={changeCommentHandler}/>
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
