import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LoginState } from "../states/LoginState";
import { UserState } from "../states/UserState";
import axios from "axios";
import logo from "../imgs/logo/logo.png";
import "../css/header.css";

const Header = () => {
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  // 회원정보 상태
  const [userState, setUserState] = useRecoilState(UserState);

  // 회원정보 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      const accesToken = localStorage.getItem("user");
      axios
        .post(
          "http://13.125.105.33:8080/auth/infoByToken",
          (axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accesToken}`)
        )
        .then((response) => {
          // console.log(response.data);
          setUserState(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

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
    setIsLoggedIn(false); // 로그인전역상태 false변경
    setUserState({
      email: "",
      identifier: "",
      messageCount: 0,
      username: "",
    });
  };

  return (
    <div className="headerContainer">
      <div className="logoDiv">
        <Link to="/home">
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
            <span>{userState ? userState.username : "사용자"}</span>님
          </div>
          <button onClick={logoutHandler}>로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default Header;
