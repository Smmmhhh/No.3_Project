import React, { useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [logIn, setLogIn] = useState(false);
  const [userId, setuserId] = useState("");
  const [userPw, setuserPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("/login", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userPw }),

    });

    if (response.ok) {
      // 로그인 성공 시
      setLogIn(true);
      navigate(-1);
      alert("로그인 성공");

    } else {
      // 로그인 실패 시
      alert("아이디와 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="login">
      <img className="login_main_img" src="/assets/logo.png" />
      <div className="login_form">
        <div className="login_left">
          <img className="login_left_img" src="/assets/loginpanda.png" />
        </div>
        <div className="login_right">
          <h1>로그인</h1>
          <div className="login_id">
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder="아이디"
              value={userId}
              onChange={(e) => setuserId(e.target.value)}

            />
          </div>
          <div className="login_pw">
            <input
              type="password"
              id="userPw"
              name="userPw"
              placeholder="비밀번호"
              value={userPw}
              onChange={(e) => setuserPw(e.target.value)}

            />
          </div>
          <Link to="/register">
            <p>아직 회원이 아니신가요?</p>
          </Link>
          <button onClick={handleLogin}>로그인</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
