import React from "react";
import { useState } from "react";
import axios from "axios";
import { LoginState } from "../../states/LoginState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [loginInputs, setLoginInputs] = useState({
    loginEmail: "",
    loginPwd: "",
  });
  const { loginEmail, loginPwd } = loginInputs;
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  // 로그인 onchange 이벤트
  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // tes1 abcde@naver.com tes1
  // inner tes2@naver.com tes2
  // inner2 tes3@naver.com tes3
  // 로그인 기능
  const loginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://13.125.105.33:8080/auth/login", {
        email: loginEmail,
        password: loginPwd,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", response.data.accessToken); // 토큰 저장하기
        // localStorage.setItem("userName", response.data.username); // 사용자이름 저장하기
        setIsLoggedIn(true); // 로그인 상태변경
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <form id="login" className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder="User Email"
        required
        onChange={onChangeLogin}
        name="loginEmail"
      />
      <input
        type="password"
        className="input-field"
        placeholder="Enter Password"
        required
        onChange={onChangeLogin}
        name="loginPwd"
      />

      <button className="submit" onClick={loginSubmit}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
