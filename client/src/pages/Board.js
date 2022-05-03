import React from "react";
import styled from "styled-components";
import Navi from "../modals/Navi";

function Board() {
  return (
    <BoardContainer>
      <BoardSection>
        <BoardDiv>
          <Map></Map>
        </BoardDiv>
      </BoardSection>
    </BoardContainer>
  );
}

export default Board;

const Map = styled.div`
  width: 500px;
  height: 400px;
`;

const BoardContainer = styled.div`
  width: 100%;
  height: 90vh;
  background: white;
  display: flex;
  flex-direction: column;
`;

const BoardSection = styled.section`
  width: auto;
  height: 95%;
  padding: 5vh 5vw;
  background-color: #082032;
`;

const BoardDiv = styled.div`
  width: auto;
  height: 85%;
  padding: 5vh 5vw;
  border: 5px solid #2c394b;
  background-color: #082032;
  box-shadow: 15px 15px 10px #334756;
`;
