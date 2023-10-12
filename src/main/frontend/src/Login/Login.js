import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
      <img className="login_main_img" src="/assets/logo.png" />
      <div className="login_form">
        <div className="login_left">
          <img className="login_left_img" src="/assets/loginpanda.png" />
        </div>
        <div className="login_right">
          <h1>SIGN IN</h1>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <Link to="/register">
            <p>아직 회원이 아니신가요?</p>
          </Link>
          <button>LOGIN</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
