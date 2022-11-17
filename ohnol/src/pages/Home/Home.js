import {React,useEffect,useState} from "react";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import { UserState } from "../../states/UserState";
import axios from "axios";
import heart from "../../imgs/home/heart.png";
import countCal from "../../imgs/home/countCal.png"
import check from "../../imgs/home/checkCircle.png"

const Home = () => {
  // 로그인해야만 보이는 곳입니다
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [style, setStyle] = useState(false)

  //복사 완료 뜨게
  function copyComplete() {
    setStyle(style => !style);
  }

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
          console.log(response.data);
          setUserState(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);


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
    setInterval((e)=>{
      setSecsOne(diffSecsOne());
    },1000)
  }


  return (
    <section id="main">
      <img></img>
      <div className="introduce">
        <div className="introduce-heart">
          <img src={heart} alt="리본하트이미지"></img>
          <span className="introduce-comment">마음이 통하기까지</span>
        </div>
        <table className="calendar" border="1">
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
        <div className="guide-top">
          <span className="name-guide">{userState.username}</span><span className="guide1">님의 집에</span><span className="cnt-guide">32</span><span className="guide2">명이 놀러 왔어요!</span>
        </div>
        <div className="btn-copy" onClick={copyComplete}>
          내 집 링크 복사하기
        </div>
        <div classNmae="completeNotf">
          <div className="completeCopy">
            <img src={check} width="20px"/>
            <span style={style}>복사 완료</span>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Home;
