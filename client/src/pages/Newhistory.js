import React from "react";
import styled from "styled-components";
import PostBoard from "../modals/PostBoard";
import SearchAddress from "../components/Search";

function Newhistory() {
  return (
    <MapContainer>
      <NewHistoryDiv>
        <PostBoard></PostBoard>
      </NewHistoryDiv>
    </MapContainer>
  );
}
export default Newhistory;

const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const NewHistoryDiv = styled.div`
  width: 50%;
  height: 70vh;
  border-radius: 2rem;
  margin: auto;
  background-color: #faeee0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 15px 15px 10px #334756;
`;
