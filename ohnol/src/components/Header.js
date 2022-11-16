import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState } from "../states/LoginState";
import axios from "axios";
import logo from "../imgs/logo/logo.png";
import "../css/header.css";

const Header = () => {
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  console.log(isLoggedIn);
  // 로그인 유저 이름 가져와서 username DIV에 넣기
  // const userName = localStorage.getItem("userName");

  // 로그아웃기능
  const logoutHandler = (e) => {
    e.preventDefault();
    const accesToken = localStorage.getItem("user");
    axios
      .post(
        "http://13.125.105.33:8080/auth/logout",
        (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accesToken}`)
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    localStorage.removeItem("user"); // 로컬스토리지에 있는 토큰삭제
    // localStorage.removeItem("userName"); 사용자이름 삭제
    setIsLoggedIn(false); // 로그인전역상태 false변경
  };

  return (
    <div className="headerContainer">
      <div className="logoDiv">
        <Link to="/">
          <img src={logo} alt="로고이미지" />
        </Link>
      </div>
      {/* // login 상태에 따른 토글*/}
      {!isLoggedIn ? (
        <div className="loginRegisterDiv">
          <Link to="/loginForm">로그인</Link>
          <Link to="/signUp">회원가입</Link>
        </div>
      ) : (
        <div className="logoutDiv">
          <div className="userName">
            <span>임윤지</span>님
          </div>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default Header;
