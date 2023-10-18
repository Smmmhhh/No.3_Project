import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyHeader = () => {
  const [Login, setLogin] = useState(false);
  const [userNo, setUserNo] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      const { userNo, userName } = userData.data;
      setLogin(true);
      setUserNo(userNo);
      setUserName(userData.data.userName);
    }
  }, []);
  const handleLogout = async () => {
    sessionStorage.removeItem("userData");
    setLogin(false);
    setUserNo(0);
    setUserName("");
    try {
      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("로그아웃 성공");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };
  return (
    <header>
      <div className="header_left">
        <Link to="/" style={{ width: "200px" }}>
          <img className="logo_img" src="/assets/logo.png" alt="로고" />
        </Link>
        <Link to="/product">
          <h1 className="category">중고 거래</h1>
        </Link>
      </div>
      <div className="search">
        <input type="text" />
        <img src="/assets/search_img.png" alt="검색" />
      </div>
      <div className="header_right">
        {Login ? (
          <>
            <p>{`${userName}님 반갑습니다.`}</p>
            <Link to="/mypage">
              <p className="my_page">마이페이지</p>
            </Link>
            <Link to="/chat">
              <p className="chat_list">채팅목록</p>
            </Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <p className="login">로그인</p>
            </Link>
            <Link to="/register">
              <p className="register">회원가입</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default MyHeader;
