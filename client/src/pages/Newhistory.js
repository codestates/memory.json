import React from "react";
import styled from "styled-components";
import PostBoard from "../modals/PostBoard";
import SearchAddress from "../components/Search";

function Newhistory() {
  return (
    <MapContainer>
      <MapSection>
        <MapDiv>
          <PostBoard></PostBoard>
        </MapDiv>
      </MapSection>
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
  background-color: #2c394b;
  box-shadow: 15px 15px 10px #334756;
`;
