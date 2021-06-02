import React, { useEffect, useState } from "react";
import "./Nav.css";
import logo from "./assets/logoicon.png";
import avatar from "./assets/avatar.png";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src={logo} alt="Netflix Logo" />
      <img className="nav_avatar" src={avatar} alt="Your user icon" />
    </div>
  );
}

export default Nav;
