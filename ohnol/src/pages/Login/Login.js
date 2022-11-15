import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mainLogin">
      <div className="nav">
        <Link to="/loginForm">로그인</Link>
        <Link to="/signUp">회원가입</Link>
      </div>
      <div>이미지창</div>
    </div>
  );
};

export default Login;
