import React from "react";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import axios from "axios";

const Home = () => {
  // 로그인해야만 보이는 곳입니다
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  return (
    <section id="main" className="my-5 py-5 px-4 mx-auto">
      <div className="introduce">오랜만에 놀러와!</div>
    </section>
  );
};

export default Home;
