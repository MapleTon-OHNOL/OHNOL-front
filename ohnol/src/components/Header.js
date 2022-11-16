import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="logoDiv">
        <img className="logoImg"></img>
      </div>

      <div className="loginRegister">
        <Link to="/loginForm">로그인</Link>
        <Link to="/signUp">회원가입</Link>
      </div>
    </div>
  );
};

export default Header;
