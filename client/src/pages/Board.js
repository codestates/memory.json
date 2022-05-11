import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import MapArea from "../components/Map";
import SearchPlace from "../components/SearchPlace";
import { useSelector } from "react-redux";

function Board({ modalOpener }) {
  const signinState = useSelector((state) => state.authReducer);
  const { isSignin } = signinState;

  const checkedLogin = () => {
    alert("로그인을 해주세요");
    modalOpener();
  };

  return (
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
          <SearchPlace></SearchPlace>
          <MapArea></MapArea>
        </MapDiv>
      </MapSection>
    </MapContainer>
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
