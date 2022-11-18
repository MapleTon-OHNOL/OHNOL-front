import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import signUpImg from "../../imgs/login/loginRegister.png";
import "../../pages/SignUp/SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [pwdErrors, setPwdErrors] = useState("");
  // 회원가입
  const [registerInputs, setRegisterInputs] = useState({
    email: "",
    username: "",
    pwd: "",
    confirmPwd: "",
  });
  const { email, username, pwd, confirmPwd } = registerInputs;

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
    e.preventDefault();
    // 비밀번호 , 비밀번호 확인 에러처리
    if (pwd === confirmPwd) {
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
        .catch((err) => {
          // Handle error.
          console.log("An error occurred:", err.response);
          if (err.response.code === "DUPLICATE_USER") {
            setErrors("이미 존재하는 사용자입니다.");
          } else if (err.response?.status === 400) {
            setErrors("이메일 또는 패스워드를 확인해주세요");
            console.log(err);
          }
        });
    } else {
      setPwdErrors("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="signUpContainer">
      <div className="signUpText">
        <h2>SIGN UP</h2>
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
        {errors ? (
          <p className="errorMessage"> 이미 존재하는 사용자입니다.</p>
        ) : null}
        <input
          type="password"
          className="input-field"
          placeholder="Enter Password"
          required
          onChange={onChangeRegister}
          name="pwd"
        />
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
          required
          onChange={onChangeRegister}
          name="confirmPwd"
        />
        {pwdErrors ? <p className="errorMessage">{pwdErrors}</p> : null}
        <button className="submit" onClick={register}>
          <p>회원가입하기</p>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
