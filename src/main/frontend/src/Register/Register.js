import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import PostCode from "../Components/PostCode";

const Register = () => {
  // 글자 수 제한

  return (
    <div className="register">
      <div className="top_logo">
        <Link to={"/"}>
          <img src="/assets/logo.png" />
        </Link>
      </div>
      <div className="register_inputs">
        <section className="register_left">
          <p className="title">회원가입</p>
          <form className="register_form">
            <div className="info_section">
              <div className="item">
                <label for="id">아이디</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="5~20자"
                  onChange={() => {}}
                  required
                />

                <p className="check_id_txt">이미 존재하는 아이디입니다.</p>
              </div>

              <div className="item">
                <label for="name">이름</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="2~10자"
                  required
                />
              </div>
            </div>
            <div className="info_section">
              <div className="item">
                <label for="pwd">비밀번호</label>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  placeholder="5~20자"
                  required
                />
              </div>
              <div className="item">
                <label for="nickname">닉네임</label>
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="2~10자"
                  required
                />
                <p className="check_nickname_txt">
                  이미 존재하는 닉네임입니다.
                </p>
              </div>
            </div>
            <div className="info_section">
              <div className="item">
                <label for="checkpwd">비밀번호 확인</label>
                <input
                  type="password"
                  name="checkpwd"
                  id="checkpwd"
                  placeholder="5~20자"
                  required
                />
                <p className="check_pwd_txt">비밀번호가 일치하지 않습니다.</p>
              </div>
              <div className="item">
                <label for="phone">전화번호</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="010-xxxx-xxxx"
                  required
                />
              </div>
            </div>

            <div className="info_section">
              <div className="item">
                <label for="mytown">동네 설정</label>
                <PostCode />
              </div>
              <div className="item">
                <input type="hidden"></input>
              </div>
            </div>
            <button>JOIN</button>
          </form>
        </section>
        <section className="register_right">
          <img src="assets/loginpanda.png" />
        </section>
      </div>
    </div>
  );
};
export default Register;
