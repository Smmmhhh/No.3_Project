import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [logIn, setLogIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // 로그인 성공 시
      setLogIn(true);
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
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login_pw">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
