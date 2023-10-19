import { useEffect, useRef, useState } from "react";

import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const MyPageEdit = (props) => {
  const [userEditInfo, setUserEditInfo] = useState({}); // 유저 전체 정보
  const [nick, setNick] = useState(props.userInfo.userNickname); // 닉네임
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열
  const [isOpen, setIsOpen] = useState(false); // 주소 모달창
  const [modalIsOpen, setModalIsOpen] = useState(false); // 탈퇴 모달창
  const [localPhoneNo, setLocalPhoneNo] = useState(props.userInfo.userPhoneno); // 로컬 상태 추가
  const [password, setPassword] = useState(""); // 비밀번호 입력값
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부
  const [showPasswordFields, setShowPasswordFields] = useState(false); // 비밀번호 변경 필드 표시 여부
  const [showNick, setShowNick] = useState(false); // 412 에러 처리 문구
  const [showAddress, setShowAddress] = useState(false); // 409 에러 처리 문구
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [formData, setFormData] = useState({
    // 서버 전달 객체
    userPw: "",
    userNickname: "",
    userPhoneno: "",
    userAddress: "",
  });

  const navigate = useNavigate();

  const nicknameRef = useRef(null);
  const pwdRef = useRef(null);
  const pwdMatchRef = useRef(null);

  // 모달창의 정보 가져오기
  const completeHandler = (data) => {
    const formattedAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    setJibunAddress(formattedAddress);
    setFormData({ ...formData, userAddress: formattedAddress });
    setIsOpen(false);
  };

  // Modal 스타일
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

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // 회원 탈퇴 클릭
  const removeBtnToggle = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // input 태그
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setNick(value);
  };

  useEffect(() => {
    setUserEditInfo(props.userInfo);
  }, []);
  // formData 변경이 없을 경우
  useEffect(() => {
    if (!formData.userAddress) {
      setFormData({ ...formData, userAddress: userEditInfo.userAddress });
    } else if (!formData.userNickname) {
      setFormData({ ...formData, userNickname: userEditInfo.userNickname });
    } else if (!formData.userPhoneno) {
      setFormData({ ...formData, userPhoneno: userEditInfo.userPhoneno });
    } else if (!formData.userPw) {
      setFormData({ ...formData, userPw: userEditInfo.userPw });
    }
  }, [formData]);

  useEffect(() => {
    if (passwordsMatch) {
      setFormData({ ...formData, userPw: password });
    } else {
      setFormData({ ...formData, userPw: userEditInfo.userPw });
    }
  }, [passwordsMatch]);

  const handleLogout = async () => {
    sessionStorage.removeItem("userData");

    try {
      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  // 회원탈퇴 핸들러
  const handleRemoveUser = async () => {
    const response = await fetch(`/mypage/users/${userEditInfo.userNo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    switch (resData.status) {
      case 200:
        alert(resData.message);
        handleLogout();
        navigate("/", { replace: true });
        break;
      case 409:
        alert(resData.message);
        break;
      default:
        console.error("Unexpected response status:", resData.status);
    }
  };

  const handleSaveBtn = async () => {
    if (!passwordsMatch) {
      pwdRef.current.focus();
    } else if (!isValidPassword) {
      pwdMatchRef.current.focus();
    } else {
      const response = await fetch(`/mypage/users/${userEditInfo.userNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      switch (responseData.status) {
        case 200:
          alert(responseData.message);
          // 정보 수정하면 로그아웃 시키고 로그인 페이지로 이동
          handleLogout();
          navigate("/login", { replace: true });
          break;
        case 412:
          setShowNick(true);
          nicknameRef.current.focus();
          break;
        case 409:
          setShowAddress(true);
          break;
        default:
          console.error("Unexpected response status:", responseData.status);
      }
    }
  };

  const handlePwdBtn = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  // 비밀번호 입력값 변경 핸들러
  const handlePasswordChange = (e) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    setIsValidPassword(isValidPasswordFormat(newPwd));
  };

  // 비밀번호 확인 입력값 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // 비밀번호 일치 확인
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const isValidPasswordFormat = (pwd) => {
    // 비밀번호가 5~20글자, 영어와 숫자만 포함하는 정규식
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,20}$/;
    return regex.test(pwd);
  };

  return (
    <div className="mypage-edit">
      <div className="remove-user">
        <p className="delete-user-btn" onClick={removeBtnToggle}>
          회원탈퇴
        </p>
        <Modal isOpen={modalIsOpen} ariaHideApp={false}>
          <h2>회원 탈퇴</h2>
          <p>정말로 회원 탈퇴를 진행하시겠습니까?</p>
          <button onClick={handleRemoveUser}>탈퇴</button>
          <button onClick={removeBtnToggle}>취소</button>
        </Modal>
      </div>
      <div className="top-profile-info">
        <div className="profile-img-grade">
          <img src="/assets/profile_default.png" alt="profile-default-img" />
          <img src="/assets/grade1.png" alt="grade-img" />
        </div>
        <h2>{userEditInfo.userNickname}</h2>
      </div>
      <hr />
      <div className="profile-edit-section">
        <section className="edit-info">
          <p className="edit-id">
            아이디
            <input value={userEditInfo.userId} disabled />
          </p>
          <p className="edit-name">
            이름
            <input value={userEditInfo.userName} disabled />
          </p>
          <p className="edit-phone">
            전화번호
            <NumberFormat
              format="###-####-####"
              mask="_"
              value={localPhoneNo}
              placeholder="010-1234-5678"
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                setLocalPhoneNo(value);
                if (value.length === 0 || value.length === 11) {
                  setFormData({ ...formData, userPhoneno: formattedValue });
                }
              }}
            />
          </p>
          <p className="edit-nickname">
            닉네임
            <input
              type="text"
              name="userNickname"
              id="userNickname"
              value={nick}
              onChange={handleInputChange}
              ref={nicknameRef}
            />
          </p>
          {showNick && (
            <>
              <p>이미 존재하는 닉네임입니다.</p>
            </>
          )}
        </section>

        <section className="edit-pwd">
          <button onClick={handlePwdBtn}>비밀번호 변경</button>
          {showPasswordFields && (
            <>
              <p className="edit-pwd">
                비밀번호
                <input
                  className="userPw"
                  name="userPw"
                  type="password"
                  placeholder="5~20자, 영문자 및 숫자만 가능"
                  onChange={handlePasswordChange}
                  ref={pwdMatchRef}
                />
              </p>
              {!isValidPassword && <p>비밀번호 형식이 일치하지 않습니다.</p>}
              <p className="edit-pwd-match">
                비밀번호 확인
                <input
                  type="password"
                  onChange={handleConfirmPasswordChange}
                  ref={pwdRef}
                />
              </p>
              {!passwordsMatch && <p>비밀번호가 일치하지 않습니다.</p>}
            </>
          )}
        </section>

        <section className="edit-town" onClick={toggle}>
          <p>동네 설정</p>
          <button onClick={toggle}>주소 검색</button>
          <input
            value={
              jibunAddress === "" ? userEditInfo.userAddress : jibunAddress
            }
          />
          {showAddress && <p>주소 형식이 잘못 되었습니다.</p>}
          <div className="post_code_modal">
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostCode onComplete={completeHandler} />
            </Modal>
          </div>
        </section>
      </div>
      <button className="save-btn" onClick={handleSaveBtn}>
        저장
      </button>
    </div>
  );
};

export default MyPageEdit;
