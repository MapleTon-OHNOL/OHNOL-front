import React from "react";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import axios from "axios";

const Home = () => {
  // 로그인해야만 보이는 곳입니다
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  // 로그아웃기능
  const logoutHandler = (e) => {
    e.preventDefault();
    const accesToken = localStorage.getItem("user");
    axios
      .post(
        "http://52.78.126.242:8080/auth/logout",
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
  };
  console.log(isLoggedIn);
  return (
    <section id="main" className="my-5 py-5 px-4 mx-auto">
      <div className="introduce">오랜만에 놀러와!</div>
      {/* 로그아웃 */}
      <button onClick={logoutHandler}>로그아웃</button>
    </section>
  );
};

export default Home;
