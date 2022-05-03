import React from 'react';
import styled from 'styled-components';

const AlterBoxStyle = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin-top: 30vh;
  margin: 30vh 30vw 0px 30vw;

  text-align: center;
  vertical-align: middle;
  background-color:whitesmoke;
  padding: 2em 2.4em 2em 2.4em;
  border-radius: 40px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  color: black;
  font-size: 1.2em;
  font-weight: bold;
  font-size: 1rem;

  transition-duration: 300ms;
  z-index: 999;
`;

function Alert({ message, setCheckErr = () => {} }) {
  return (
    <AlterBoxStyle
      onClick={() => {
        setCheckErr(false);
      }}>
      {message}
    </AlterBoxStyle>
  );
}

export default Alert;
