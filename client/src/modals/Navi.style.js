import styled from "styled-components";

const NaviDiv = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const NaviText = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 22px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  a:hover {
    background-color: #1a83ff;
  }
`;

export { NaviDiv, NaviText };
