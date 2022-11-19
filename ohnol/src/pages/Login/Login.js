import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo/logo2.png";
import items from "../../imgs/login/items.png"
import items1 from "../../imgs/login/items1.png";
import items2 from "../../imgs/login/items2.png";
import items3 from "../../imgs/login/items3.png";
import items4 from "../../imgs/login/items4.png";
import items5 from "../../imgs/login/items5.png";
import items6 from "../../imgs/login/items6.png";
import items7 from "../../imgs/login/items7.png";
import items8 from "../../imgs/login/items8.png";
import items9 from "../../imgs/login/items9.png";
import items10 from "../../imgs/login/items10.png";
import items11 from "../../imgs/login/items11.png";
import items12 from "../../imgs/login/items12.png";
import items13 from "../../imgs/login/items13.png";
import "./Login.css";


const Login = () => {

  return (
    <div className="mainLoginContainer">
      <div className="items-container">
          <img src={items1} alt="배경아이콘" className="backStyle1" />
          <img src={items2} alt="배경아이콘" className="backStyle2" />
          <img src={items3} alt="배경아이콘" className="backStyle3" />
          <img src={items4} alt="배경아이콘" className="backStyle4" />
          <img src={items5} alt="배경아이콘" className="backStyle5" />
          <img src={items6} alt="배경아이콘" className="backStyle6" />
      </div>


      <div className="mainLogin">
        <img src={logo} alt="로고이미지"/>
        <p className="bigContent">
          오랜만에 놀러와~~!
        </p>
        <p className="content">
          보고 싶은 사람에게 용기 내서 편지를 작성해 보세요.<br />
          서로에게 편지를 썼다면 <br />
          크리스마스이브에 당신의 마음이 전달됩니다!<br />
        </p>
      </div>
    </div>
  );
};

export default Login;
