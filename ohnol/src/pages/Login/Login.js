import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo/logo2.png";

import "./Login.css";

const Login = () => {
  return (
    <div className="mainLoginContainer">
      <div className="mainLogin">
        <img src={logo} alt="로고이미지" />
        <p className="bigContent">오랜만에 놀러와~~!</p>
        <p className="content">
          보고 싶은 사람에게 용기 내서 편지를 작성해 보세요.
          <br />
          서로에게 편지를 썼다면 <br />
          크리스마스이브에 당신의 마음이 전달됩니다!
          <br />
        </p>
      </div>
    </div>
  );
};

export default Login;
