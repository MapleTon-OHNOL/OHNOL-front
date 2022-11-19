import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LoginState } from "../../states/LoginState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router";
import "./LoginForm.css";
import loginImg from "../../imgs/login/loginRegister.png";
import { IsOwner } from "../../states/IsOwner";
import { LoginOwner } from "../../states/LoginOwner";

const LoginForm = () => {
  // 이 페이지가 주인으로 들어왔는지 확인하기 위한 상태
  const [isOwner, setIsOwner] = useRecoilState(IsOwner);
  // 이 페이지가 주인이 아니라면 host URL로 이동시켜줌
  const [loginHost, setLoginHost] = useRecoilState(LoginOwner);
  console.log(loginHost);
  console.log(isOwner);
  const [loginInputs, setLoginInputs] = useState({
    loginEmail: "",
    loginPwd: "",
  });
  const { loginEmail, loginPwd } = loginInputs;
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  // 에러 메세지 출력
  const [errors, setErrors] = useState("");

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
        setErrors(error.response.data.message);
      });

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
          if (isOwner) {
            // isOwner가 true일 경우 그 주인페이지로 이동
            navigate(`/home/${loginHost}`);
          } else {
            // isOwner가 false일 경우 자신의 홈페이지로 이동
            navigate(`/home/${response.data.identifier}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 로그인 완료하면 유저정보를 통해서 home/:userID로 이동하기
  // TODO - 링크타고들어온사람은 페이지주인의 home/:주인ID로 이동해야한다
  // useEffect(() => {

  // }, [isLoggedIn]);

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
        {errors ? <p className="errorMessage">{errors}</p> : null}
        <button className="submit" onClick={loginSubmit}>
          <p>로그인하기</p>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
