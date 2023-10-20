import { Link, useNavigate } from "react-router-dom";
import "./MyPageForm.css";
import { useEffect, useState } from "react";

const MyPage = ({ showFooter }) => {
  const [userNo, setUserNo] = useState(0);
  const [userNickName, setUserNickName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userData.data);
    if (userData) {
      setUserNo(userData.data.userNo);
      setUserNickName(userData.data.userNickname);
    }
  }, []);

  return (
    <div>
      <mypageform>
        <div className="mypage">
          <h2>마이 페이지</h2>
          <hr className="mypage_hr" />
          <div className="first_section">
            <div className="first_section_left">
              <img className="profile" src="/assets/profile_default.png" />
              <h2>{userNickName}</h2>
              <img className="grade" src="/assets/grade1.png" />
            </div>
            <div className="first_section_right">
              <Link to="/mypage/users/">
                <p>정보 수정</p>
              </Link>
            </div>
          </div>
          <hr className="mypage_hr" />
          <div className="second_section">
            <Link to={`/mypage/sales/${userNo}`}>
              <button className="mypageform_btn_sales">
                <div className="mypage_img">
                  <img src="/assets/mypage_sales.png" />
                </div>
                <p>판매 내역</p>
              </button>
            </Link>
            <Link to={`/mypage/purchases/${userNo}`}>
              <button className="mypageform_btn_purchases">
                <div className="mypage_img">
                  <img src="/assets/mypage_purchases.png" />
                </div>
                <p>구매 내역</p>
              </button>
            </Link>
            <Link to={`/mypage/register/${userNo}`}>
              <button className="mypageform_btn_register">
                <div className="mypage_img">
                  <img src="/assets/mypage_register.png" />
                </div>
                <p>등록 내역</p>
              </button>
            </Link>
          </div>
          <hr className="mypage_hr" />
        </div>
      </mypageform>
    </div>
  );
};
export default MyPage;
