import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo/logo.png";
import "./Login.css";


const Login = () => {

  return (
    <div className="mainLoginContainer">
      <div className="mainLogin">
        <img src={logo} alt="로고이미지"/>
        <p className="bigContent">
          <span>오랜만에</span>
          <span>놀러와~~!</span>
        </p>
        <p className="content">
          망설이지마 NO NO NO~! <br />
          평소에 하고 싶었던 말, 기회가 없어서 못한 말<br />
          <span>O</span> <span>NOL</span> 을 통해 전달해보세요!
          <br />
          크리스마스 이브가 되면 당신의 메세지가 전달됩니다.
        </p>
      </div>
    </div>
  );
};

export default Login;
