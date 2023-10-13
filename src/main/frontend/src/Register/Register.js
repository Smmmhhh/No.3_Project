import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import PostCode from "../Components/PostCode";

const Register = () => {
  //input 데이터
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userNickname: "",
    userPhoneno: "",
    userAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log({ ...formData });
  };
  // JOIN 버튼 클릭
  const handleRegister = () => {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 서버 응답 확인
        // 원하는 동작 수행 (예: 리다이렉트, 메시지 표시)
      })
      .catch((error) => {
        console.error(error); // 오류 처리
      });
  };

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
                <label htmlFor="userId">아이디</label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="5~20자"
                  onChange={handleInputChange}
                  required
                />

                <p className="check_id_txt">이미 존재하는 아이디입니다.</p>
              </div>

              <div className="item">
                <label htmlFor="userName">이름</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="2~10자"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="info_section">
              <div className="item">
                <label htmlFor="userPw">비밀번호</label>
                <input
                  type="password"
                  name="userPw"
                  id="userPw"
                  onChange={handleInputChange}
                  placeholder="5~20자"
                  required
                />
              </div>
              <div className="item">
                <label htmlFor="userNickname">닉네임</label>
                <input
                  type="text"
                  name="userNickname"
                  id="userNickname"
                  onChange={handleInputChange}
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
                <label htmlFor="checkpwd">비밀번호 확인</label>
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
                <label htmlFor="userPhoneno">전화번호</label>
                <input
                  type="text"
                  name="userPhoneno"
                  id="userPhoneno"
                  onChange={handleInputChange}
                  placeholder="010-xxxx-xxxx"
                  required
                />
              </div>
            </div>

            <div className="info_section">
              <div className="item">
                <label htmlFor="mytown">동네 설정</label>
                <PostCode handleInputChange={handleInputChange} />
              </div>
              <div className="item">
                <input type="hidden"></input>
              </div>
            </div>
            <button onClick={handleRegister}>JOIN</button>
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
