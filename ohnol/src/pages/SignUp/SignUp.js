import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import signUpImg from "../../imgs/login/loginRegister.png";
import "../../pages/SignUp/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  // 회원가입
  const [registerInputs, setRegisterInputs] = useState({
    email: "",
    username: "",
    pwd: "",
  });
  const { email, username, pwd } = registerInputs;

  // 회원가입 onchange 이벤트
  const onChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  // 회원가입 기능
  const register = (e) => {
    // Request API.
    e.preventDefault();
    axios
      .post("http://13.125.105.33:8080/auth/signup", {
        username: username,
        email: email,
        password: pwd,
      })
      .then((response) => {
        // Handle success.
        console.log(response);

        navigate("/loginForm");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className="signUpContainer">
      <div className="signUpText">
        <h2>LOGIN</h2>
      </div>
      <div className="signUpImg">
        <img src={signUpImg} alt="회원가입 이미지" />
      </div>

      <form id="register" action="" className="input-group">
        <input
          type="text"
          className="input-field"
          placeholder="User name"
          required
          name="username"
          onChange={onChangeRegister}
        />
        <input
          type="email"
          className="input-field"
          placeholder="Your Email"
          required
          onChange={onChangeRegister}
          name="email"
        />
        <input
          type="password"
          className="input-field"
          placeholder="Enter Password"
          required
          onChange={onChangeRegister}
          name="pwd"
        />

        <button className="submit" onClick={register}>
          <p>회원가입하기</p>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
