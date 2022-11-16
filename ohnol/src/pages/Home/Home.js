import React from "react";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import {useState} from 'react';
import axios from "axios";
import heart from "../../imgs/home/heart.png";
import countCal from "../../imgs/home/countCal.png"
import check from "../../imgs/home/check.png"

const Home = () => {
  // 로그인해야만 보이는 곳입니다
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [style, setStyle] = useState({display:"none"})

  const [now] = useState(new Date());
  var finish = new Date('2022-12-25');
  var timeDiff = finish.getTime()-now.getTime();
  
  const diffDaysTen = Math.floor((timeDiff / (1000*60*60*24))/10);
  const diffDaysOne = Math.floor((timeDiff / (1000*60*60*24))%10);
  const diffHoursTen = Math.floor(((timeDiff / (1000*60*60)) % 24)/10);
  const diffHoursOne = Math.floor(((timeDiff / (1000*60*60)) % 24)%10);
  const diffMinsTen = Math.floor(((timeDiff / (1000*60)) % 60)/10);
  const diffMinsOne = Math.floor(((timeDiff / (1000*60)) % 60)%10);
  const diffSecsTen = Math.floor((timeDiff / 1000 % 60)/10);
  const diffSecsOne = Math.floor((timeDiff / 1000 % 60)%10);

  const CountDown = () =>{
    const diffDaysTen = () => Math.floor((timeDiff / (1000*60*60*24))/10);
    const diffDaysOne = () => Math.floor((timeDiff / (1000*60*60*24))%10);
    const diffHoursTen = () => Math.floor(((timeDiff / (1000*60*60)) % 24)/10);
    const diffHoursOne = () => Math.floor(((timeDiff / (1000*60*60)) % 24)%10);
    const diffMinsTen = () => Math.floor(((timeDiff / (1000*60)) % 60)/10);
    const diffMinsOne = () => Math.floor(((timeDiff / (1000*60)) % 60)%10);
    const diffSecsTen = () => Math.floor((timeDiff / 1000 % 60)/10);
    const diffSecsOne = () => Math.floor((timeDiff / 1000 % 60)%10);

    const[SecsOne, setSecsOne] = useState(diffSecsOne());
    setInterval(()=>{
      setSecsOne(diffSecsOne());
    },1000)
  }

  function copyComplete() {
    setStyle({display:"inline"})
  }

  return (
    <section id="main">
      <img></img>
      <div className="introduce">
        <div className="introduce-heart">
          <img src={heart} alt="리본하트이미지"></img>
          <span className="introduce-comment">마음이 통하기까지</span>
        </div>
        <table classNameName="calendar" border="1">
          <tr className="time">
            <th scope="col"><div className="img-cal"><div className="date days-ten"> {diffDaysTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date days-one"> {diffDaysOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date hours-ten"> {diffHoursTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date hours-one"> {diffHoursOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date minutes-ten"> {diffMinsTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date minutes-one"> {diffMinsOne}</div></div></th>
            <th scope="col" className="dang">:</th>
            <th scope="col"><div className="img-cal"><div className="date seconds-ten"> {diffSecsTen}</div></div></th>
            <th scope="col"><div className="img-cal"><div className="date seconds-one"> {diffSecsOne}</div></div></th>
          </tr>
          <tr>
            <td className="date-comment" scope="row" colSpan="2">Days</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Hours</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Minutes</td>
            <td></td>
            <td className="date-comment" scope="row" colSpan="2">Seconds</td>
          </tr>
        </table>
      </div>

      <div className="guide">
        <span className="name-guide">임윤지</span><span className="guide1">님의 집에</span><span className="cnt-guide">32</span><span className="guide2">명이 놀러 왔어요!</span>
      </div>
      <div className="btn-copy" onClick={copyComplete}>
        내 집 링크 복사하기
      </div>
      <div className="completeCopy" style={{style}}>
        <img src={check} width="20px"/>
        복사 완료
      </div>
    </section>
  );
};

export default Home;
