import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
import { NaviData } from "./NaviData";
import "./Navi.css";
import "./Navi.style";
import Navbar from "../components/Navbar";
/* 아이콘 컬러 전체 변경 기능 */
import { IconContext } from "react-icons";
import { ButtonStyle, SecondDiv } from "../components/Navbar.style";
import { NaviText } from "./Navi.style";
function Navi() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      {/* 아이콘 컬러 전체 변경 기능 */}
      <IconContext.Provider value={{ color: "black" }}>
        {/* 네비게이션 토글 코드*/}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              <NavLink to="/">
                <BsIcons.BsFillHouseFill />
                <NaviText>홈</NaviText>
              </NavLink>
            </li>
            <li>
              <SecondDiv>
                <ButtonStyle></ButtonStyle>
                <span className="nav-text">로그인</span>
              </SecondDiv>
            </li>
            <li>
              <NavLink to="/board">
                <BsIcons.BsFillImageFill />
                <span className="nav-text">게시판</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
export default Navi;
