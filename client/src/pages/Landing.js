import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "../App.css";

function Landing() {
  return (
    <NavLink to="/main">
      <img src="img/landing.png" alt="landing logo" className="landingLogo" />
    </NavLink>
  );
}

export default Landing;
