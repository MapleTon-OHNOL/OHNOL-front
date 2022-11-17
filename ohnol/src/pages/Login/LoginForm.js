import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LoginState } from "../../states/LoginState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import "./LoginForm.css";
import loginImg from "../../imgs/login/loginRegister.png";

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
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  // 로그인 완료하면 유저정보를 통해서 home/:userID로 이동하기
  useEffect(()=>{
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
          navigate(`/home/${response.data.identifier}`);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  },[isLoggedIn])


  

  return (
    <div className="loginFormContainer">
      <div className="longinText">
        <h2>LOGIN</h2>
      </div>
      <div className="loginImg">
        <img src={loginImg} alt="로그인 이미지" />
      </div>

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
        ></input>

        <button className="submit" onClick={loginSubmit}>
          <p>로그인하기</p>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
