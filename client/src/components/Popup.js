import React from 'react';
import styled from 'styled-components';

const PopUpmessage = styled.div`
  /* position: fixed;
  margin: 60px auto;
  left: 0;
  right: 0;
  background: #f5f5f5;
  color: #000;
  text-align: center;
  width: 400px;
  height: auto;

  display: inline-block;
  box-shadow: rgba(163, 163, 163, 0.76) 0px 0px 15px 0px;
  font-family: font-css;
  font-size: 50px;
  z-index: 999; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin-top: 30vh;
  margin: 30vh 30vw 0px 30vw;

  text-align: center;
  vertical-align: middle;
  background-color: mediumvioletred;
  padding: 2em 2.4em 2em 2.4em;
  max-width: 40vw;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  /* white-space: nowrap; */
  font-family: font-css;
  font-size: 2rem;

  transition-duration: 300ms;
  z-index: 999;
`;

const XDivStyle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 30px;
  margin-top: 5px;
  cursor: pointer;
  font-size: 40px;
`;

function PopUp({ text, type }) {
  const handleClosePopUp = () => {
    window.location.replace('/');
  };
  return (
    <>
      {type ? (
        <PopUpmessage>
          <div>{text}</div>
          <XDivStyle onClick={handleClosePopUp}>확인</XDivStyle>
          <XDivStyle onClick={handleClosePopUp}>취소</XDivStyle>
        </PopUpmessage>
      ) : (
        <PopUpmessage>
          <XDivStyle onClick={handleClosePopUp}>x</XDivStyle>
          <div>{text}</div>
        </PopUpmessage>
      )}
    </>
  );
}

export default PopUp;
