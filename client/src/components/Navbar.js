import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Navbar.css";

function Nav() {
  const [sidebar, setsidebar] = useState(false);
  const showSidebar = () => setsidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar">
        <NavLink to="#" classname="menu-bars">
          <FaIcons.FaBars onclick={showSidebar} />
        </NavLink>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onclick={showSidebar}>
          <li className="navbar-toggle">
            <NavLink to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </NavLink>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Nav;
