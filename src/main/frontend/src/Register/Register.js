import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";
import NumberFormat from "react-number-format";

const Register = () => {
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열 //
  const [isOpen, setIsOpen] = useState(false); // 주소 모달창 //
  // 비밀번호 일치 상태 관리
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [password, setPassword] = useState(""); // 비밀번호 입력값
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부

  const navigate = useNavigate();

  //input 데이터
  const [formData, setFormData] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userNickname: "",
    userPhoneno: "",
    userAddress: "",
  });

  // 모달창의 정보 가져오기 //
  const completeHandler = (data) => {
    const formattedAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    setJibunAddress(formattedAddress);
    setFormData({ ...formData, userAddress: formattedAddress });
    setIsOpen(false);
  };

  // Modal 스타일 //
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "650px",
      height: "400px",
      padding: "0",
      overflow: "hidden",
    },
  };

  // 검색 클릭 //
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 비밀번호 입력값 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(passwordsMatch);
  };

  // 비밀번호 확인 입력값 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // 비밀번호 일치 확인
  useEffect(() => {
    console.log("비밀번호 입력 확인 : ", password, confirmPassword);
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // 조건문으로 각각 필드마다 정규표현식 삽입하기
    // 비밀번호 형식 확인 (영어와 숫자만, 5~20 글자)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/;
    setIsValidPassword(regex.test(formData.userPw));
  };

  // JOIN 버튼 클릭
  const handleRegister = async () => {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();

    switch (responseData.status) {
      case 200:
        alert(responseData.message);
        navigate("/login", { replace: true });
        break;
      case 409:
        break;
      case 410:
        break;
      case 411:
        break;
      case 412:
        break;
      default:
        console.error("Unexpected response status:", responseData.status);
    }
  };

  useEffect(() => {
    console.log("회원 정보 입력 : ", formData);
  }, [formData]);

  return (
    <div className="register">
      <div className="top_logo">
        <Link to={"/"}>
          <img src="/assets/logo.png" alt="logoImage" />
        </Link>
      </div>
      <div className="register_inputs">
        <section className="register_left">
          <p className="title">회원가입</p>

          <div className="register_form">
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
                  onChange={(e) => {
                    handleInputChange(e);
                    handlePasswordChange(e);
                  }}
                  placeholder="5~20자"
                  required
                />
                {!isValidPassword && (
                  <p>
                    올바른 비밀번호 형식이 아닙니다.
                    <br />
                    5~20글자, 대/소문자, 영어 조합
                  </p>
                )}
              </div>
              <div className="item">
                <label htmlFor="checkpwd">비밀번호 확인</label>
                <input
                  type="password"
                  name="checkpwd"
                  id="checkpwd"
                  placeholder="5~20자"
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!passwordsMatch && (
                  <>
                    <p className="check_pwd_txt">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="info_section">
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
              <div className="item">
                <label htmlFor="userPhoneno">전화번호</label>
                <NumberFormat
                  format="###-####-####"
                  mask="_"
                  placeholder="010-1234-5678"
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    if (value.length === 0 || value.length === 11) {
                      setFormData({ ...formData, userPhoneno: formattedValue });
                    }
                  }}
                />
              </div>
            </div>

            <div className="info_section" onClick={toggle}>
              <div className="item">
                <label htmlFor="mytown">동네 설정</label>
                <input
                  id="address"
                  type="button"
                  onClick={toggle}
                  value={"주소 검색"}
                />
                <input
                  name="userAddress"
                  id="userAddress"
                  type="text"
                  value={jibunAddress}
                  onChange={handleInputChange}
                  placeholder="나무시 죽순구 새싹동"
                  required
                  disabled
                />
                <div className="post_code_modal">
                  <Modal
                    isOpen={isOpen}
                    ariaHideApp={false}
                    style={customStyles}
                  >
                    <DaumPostCode onComplete={completeHandler} />
                  </Modal>
                </div>
              </div>
              <div className="item">
                <input type="hidden"></input>
              </div>
            </div>

            <button onClick={handleRegister}>JOIN</button>
          </div>
        </section>
        <section className="register_right">
          <img src="assets/loginpanda.png" alt="logoPandaImage" />
        </section>
      </div>
    </div>
  );
};
export default Register;
