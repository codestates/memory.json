import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 1rem;
  float: inline-end;
  /* margin-bottom: 30px; */

  /* 크기 */
  font-size: 1rem;

  /* 색상 */
  background: #ceab93;
  &:hover {
    background: #e3caa5;
  }
  &:active {
    background: #ad8b73;
  }

  /* 기타 */
  & + & {
    margin-top: 0.5rem;
  }
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
