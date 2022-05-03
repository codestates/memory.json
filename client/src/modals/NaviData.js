import React from "react";
import * as BsIcons from "react-icons/bs";
import Navbar from "../components/Navbar";
export const NaviData = [
  {
    title: "홈",
    path: "/",
    icon: <BsIcons.BsFillHouseFill />,
    cName: "nav-text",
  },
  {
    title: "로그인",
    path: <Navbar />,
    icon: <BsIcons.BsFillKeyFill />,
    cName: "nav-text",
  },
  {
    title: "게시판",
    path: "/board",
    icon: <BsIcons.BsFillImageFill />,
    cName: "nav-text",
  },
];
