import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import handImg from "../../imgs/writeLetter/hand.png";
import houseImg from "../../imgs/writeLetter/house.png";
import "./WriteLetter.css";
import { useRecoilState } from "recoil";
import { UserID } from "../../states/UserID";

const WriteLetter = () => {
  const [content, setContent] = useState("");
  // 회원정보에서 identifier 가져오기 (전역변수설정)
  const [userID ,setUserId] = useRecoilState(UserID)
  // console.log(userID)

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  

  // 작성한 편지 제출하기
  const letterSubmit = (e) => {
    e.preventDefault();
    console.log(content);
    // axios post()   header정보 포함  + 홈화면으로 이동
    const accesToken  = localStorage.getItem("user")
    axios
        .post(
          `http://13.125.105.33:8080/u/${userID}`,
          {data:content},
          {headers: {
            "Authorization" :`Bearer ${accesToken}`
          }}
          // (axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${accesToken}`),
          
        ).then((response)=>{
          console.log(response)
        }).catch((error)=>{
          console.log(axios.defaults.headers)
          console.log(error)
        })
    setContent("");
  };
  return (
    <div className="writeLetterContainer">
      <div className="topContent">
        <h3>
          잠깐! 주승우님 집에 놀러가기 전에 <br />
          마음이 담긴 편지를 작성해주세요.
        </h3>
      </div>
      <div className="writeContent">
        <textarea
          type="text"
          className="input-field"
          required
          onChange={onChangeContent}
          value={content}
          name="loginEmail"
        />
      </div>
      <div className="bottomWrap">
        <div className="houseImg">
          <img src={houseImg} alt="집" />
        </div>
        <div className="letterSubmit">
          <button onClick={letterSubmit}>
            <span>똑똑! 저 왔어요</span>
            <img src={handImg} alt="손" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteLetter;
