import { React, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/LoginState";
import { UserState } from "../../states/UserState";
import axios from "axios";
import treeGift from "../../imgs/home/treeGift.png";
import bell from "../../imgs/home/bell.png";
import check from "../../imgs/home/checkCircle.png";
import Count from "./Count";
import OpenLetter from "./OpenLetter";
import End from "./End";
import { useParams } from "react-router-dom";
import backgroundImg from "../../imgs/home/backgroundImg.png";
import backgroundImg2 from "../../imgs/home/backgroundImg2.png";
import backgroundImg3 from "../../imgs/home/backgroundImg3.png";
import backgroundImg4 from "../../imgs/home/backgroundImg4.png";
import backgroundImg5 from "../../imgs/home/backgroundImg5.png";
import { IsOwner } from "../../states/IsOwner";
import Modal from "./Modal/Modal";
import { LoginOwner } from "../../states/LoginOwner";
import { useLocation } from "react-router-dom";

const Home = () => {
  // Params로 userID 가져오기 - 아직은 필요하지 않음
  const { userID } = useParams();
  console.log(userID);
  // 로그인상태
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [isOwner, setIsOwner] = useRecoilState(IsOwner);

  const [style, setStyle] = useState(false);
  // 회원정보 상태
  const [userState, setUserState] = useRecoilState(UserState);
  // 주인의 정보 상태관리
  const [hostName, setHostName] = useState("");
  const [hostMessageCount, setHostMessageCount] = useState(0);
  // LoginForm에서 관리할 주인의 ID - 그 경로로 이동시켜줘야함
  const location = useLocation();
  console.log(location);
  const locationArr = location.pathname.split("/");
  const HOST_ID = locationArr[locationArr.length - 1];
  console.log(HOST_ID);

  // 편지확인함 정보 상태관리
  const [confirmToMe, setConfirmToMe] = useState("");
  const [fromToMe, setFromToMe] = useState("");

  //모달
  const [modalVisible, setModalVisible] = useState(true);
  const closeModal = () => {
    setModalVisible(false);
  };

  // TODO - timeState 로 마감시간 지나면 openLetter End 컴포넌트 보여줌
  //시간 완료 됐을 때 openLetter
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 3000);
  });

  //복사 완료 뜨게
  const copyComplete = (text) => {
    if (isLoggedIn) {
      setStyle((style) => !style);
      console.log(style);
      setTimeout(()=>{setStyle(false)},1000)

      //클립보드복사
      // 흐름 1.
      let url = "";
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      url = window.document.location.href;

      textarea.value = url;
      textarea.select();
      document.execCommand("copy");
      console.log(textarea);
      document.body.removeChild(textarea);
      //alert("클립보드에 복사되었습니다.");
      
    } else {
      alert("로그인을 하지 않으면 복사할 수 없습니다.");
    }
  };


  // 회원정보 가져오기
  useEffect(() => {
    // 로그인 사용자 정보 가져오기
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
          //console.log(response.data);
          setUserState(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
      // 로그인사용자와 페이지주인 id 비교
      if (userState.identifier === userID) {
        setIsOwner(true);
        console.log("home userID", userID);
      } else {
        setIsOwner(false);
      }
    }
    // 호스트 identifier로 간단한 정보가져와서 정보 렌더링
    axios
      .post(`http://13.125.105.33:8080/auth/infoByIdentifier`, {
        identifier: userID,
      })
      .then((res) => {
        console.log(res);
        setHostName(res.data.username);
        setHostMessageCount(res.data.messageCount);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isLoggedIn]);

  // 호스트의 구체적 정보 가져옴
  const accesToken = localStorage.getItem("user");
  const getHostInfo = () => {
    axios
      .get(
        `http://13.125.105.33:8080/u/${HOST_ID}
    `,
        {
          headers: {
            Authorization: `Bearer ${accesToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.messageList[0].message.toMe);
        console.log(res.messageList[0].message.fromMe);
        // setConfirmToMe(res.messageList[0].message.toMe)
        // setConfirmToMe(res.messageList[0].message.fromMe)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getHostInfo();
  });
  //작성하러가기
  const navigate = useNavigate();
  const goWrite = () => {
    if (isLoggedIn) {
      navigate("/writeLetter", {
        state: HOST_ID,
      });
    } else {
      alert("로그인을 하지 않으면 편지를 작성할 수 없습니다.");
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        ></Modal>
      )}

      <section id="main">
        <img></img>
        <div className="introduce">
          <Count />
        </div>

        <div className="treeGiftBell">
          <img src={treeGift} alt="트리선물이미지" className="treeGift" />
          <img src={backgroundImg} alt="배경아이콘" className="backStyle1" />
          <img src={backgroundImg2} alt="배경아이콘" className="backStyle2" />
          <img src={backgroundImg3} alt="배경아이콘" className="backStyle3" />
          <img src={backgroundImg4} alt="배경아이콘" className="backStyle4" />
          <img src={backgroundImg5} alt="배경아이콘" className="backStyle5" />
          <img src={bell} alt="종이미지" className="bell" />
        </div>

        <div className="guide">
          <div className="guide-container">
            <div className="guide-top">
              <span className="name-guide">{hostName}</span>
              <span className="guide1">님의 집에</span>
              <span className="cnt-guide">{hostMessageCount}</span>
              <span className="guide2">명이 놀러 왔어요!</span>
            </div>
            {isOwner && isLoggedIn ? (
              <div className="btn-copy" onClick={copyComplete}>
                내 집 링크 복사하기
              </div>
            ) : (
              <div className="btn-copy" onClick={goWrite}>
                나도 놀러가기!
              </div>
            )}
          </div>
          <div className="completeNotf">
            {style ? (
              <div className="completeCopy">
                <img src={check} alt="체크버튼" width="20px" />
                <span>복사 완료</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {open ? (
        <>
          <OpenLetter hostName={hostName} />
          <End />
        </>
      ) : null}
    </>
  );
};

export default Home;
