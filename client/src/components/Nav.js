import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function Nav() {
  const [sidebar, setsidebar] = useState(false);
  const showSidebar = () => setsidebar(!sidebar);

  return;
}

export default Nav;
