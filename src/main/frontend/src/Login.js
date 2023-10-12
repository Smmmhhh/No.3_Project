import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <login>
      <img src="/assets/logo.png" />
      <div className="login_form">
        <div className="login_left">
          <img src="/assets/loginpanda.png" />
        </div>
        <div className="login_right">
          <h1>SIGN IN</h1>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <Link to="/register">아직 회원이 아니신가요?</Link>
          <button>LOGIN</button>
        </div>
      </div>
    </login>
  );
};
export default Login;
