import {React,useEffect,useState} from "react";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import { UserState } from "../../states/UserState";
import axios from "axios";
import heart from "../../imgs/home/heart.png";
import treeGift from "../../imgs/home/treeGift.png";
import bell from "../../imgs/home/bell.png";
import check from "../../imgs/home/checkCircle.png"
import Count from "./Count";
import OpenLetter from "./OpenLetter";
import End from "./End";

const Home = () => {
  // 로그인해야만 보이는 곳입니다
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [style, setStyle] = useState(false)

  //복사 완료 뜨게
  function copyComplete() {
    setStyle(style => !style);
    console.log(style);
  }
  const completeNotify = useEffect(() =>{
    if(style){ //true 이면
      <div className="completeCopy" style={{color : {style} ? 'red' : 'blue'}}>
            <img src={check} width="20px"/>
            <span>복사 완료</span>
      </div>
    }
    else{
      <div className="completeCopy" style={{color : {style} ? 'red' : 'blue'}}>
      </div>
    }
  },[style])

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


  return (
    <>
      <section id="main">
        <img></img>
        <div className="introduce">
          <div className="introduce-heart">
            <img src={heart} alt="리본하트이미지"></img>
            <span className="introduce-comment">마음이 통하기까지</span>
          </div>
          <Count/>
        </div>

        <div className="treeGiftBell">
          
          <img src={treeGift} alt="트리선물이미지"/>
          <img src={bell} alt="종이미지"/>
        </div>


        <div className="guide">
          <div className="guide-top">
            <span className="name-guide">{userState.username}</span>
            <span className="guide1">님의 집에</span>
            <span className="cnt-guide">32</span>
            <span className="guide2">명이 놀러 왔어요!</span>
          </div>
          <div className="btn-copy" onClick={copyComplete}>
            내 집 링크 복사하기
          </div>
          <div className="completeNotf">
            {style?       <div className="completeCopy">
            <img src={check} alt="체크버튼" width="20px"/>
            <span>복사 완료</span>
          </div>: null}
          </div>
        </div>
      </section>

      {/* <OpenLetter/>
      <End/> */}
      
    </>
  );
};

export default Home;
