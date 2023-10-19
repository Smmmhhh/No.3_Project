import { useEffect, useState } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import MyPageEdit from "./MyPageEdit";
import "./MyPageUsers.css";

const MyPageUsers = () => {
  const [userInfo, setUserInfo] = useState({
    userNo: 0,
    userId: "",
    userPw: "",
    userName: "",
    userNickname: "",
    userPhoneno: "",
    userAddress: "",
    userGrade: "",
    userValidity: "",
  });
  const [inputPwd, setInputPwd] = useState("");
  const [isPwdMatch, setIsPwdMatch] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserInfo(userData.data);
    }
  }, []);

  const handlePwdChange = (e) => {
    setInputPwd(e.target.value);
  };

  const handleCheckPwd = () => {
    const match = inputPwd === userInfo.userPw;
    setIsPwdMatch(match);
    if (match) {
      setShowUpdateForm(true);
    }
  };

  return (
    <div className="mypage-users">
      <MyHeader />
      <div className="pwd-check-form">
        <h2 className="title-pwd-check-form">정보 수정</h2>
        <hr />
        {!showUpdateForm ? (
          <>
            <p className="text1">
              정보를 안전하게 보호하기 위해 &nbsp;
              <span>비밀번호를 다시 한번 확인</span>
              합니다.
            </p>
            <p className="text2">
              비밀번호가 타인에게 노출되지 않도록 항상 주의해주세요.
            </p>
            <div className="input-form">
              <p className="text3">
                아이디
                <span className="id-text">{userInfo.userId}</span>
              </p>
              <p className="text4">
                비밀번호
                <input
                  type="password"
                  className="check-pwd-input"
                  onChange={handlePwdChange}
                />
              </p>
              {!isPwdMatch && <p className="text5">비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button className="submit-btn" onClick={handleCheckPwd}>
              확&nbsp;&nbsp;인
            </button>
          </>
        ) : (
          <MyPageEdit userInfo={userInfo} />
        )}
      </div>

      <MyFooter />
    </div>
  );
};
export default MyPageUsers;
