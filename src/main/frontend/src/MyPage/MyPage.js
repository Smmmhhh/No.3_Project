import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import { Link, useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useEffect } from "react";

const MyPage = () => {
  const userSession = sessionStorage.getItem("userData");

  const navigate = useNavigate();
  useEffect(() => {
    if (!userSession) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <mypage>
      <div>
        <MyHeader />
        <div className="mypage">
          <h2>마이 페이지</h2>
          <hr />
          <div className="first_section">
            <div className="first_section_left">
              <img className="profile" src="/assets/profile_default.png" />
              <h2>윰형대장</h2>
              <img className="grade" src="/assets/grade1.png" />
            </div>
            <div className="first_section_right">
              <Link to="/mypage/users">
                <p>정보 수정</p>
              </Link>
            </div>
          </div>
          <hr />
          <div className="second_section">
            <Link to="mypage/sales">
              <button>
                <div className="mypage_img">
                  <img src="/assets/mypage_sales.png" />
                </div>
                <p>판매 내역</p>
              </button>
            </Link>
            <Link to="mypage/purchases">
              <button>
                <div className="mypage_img">
                  <img src="/assets/mypage_purchases.png" />
                </div>
                <p>구매 내역</p>
              </button>
            </Link>
            <Link to="/mypage/register/:userNo">
              <button>
                <div className="mypage_img">
                  <img src="/assets/mypage_register.png" />
                </div>
                <p>등록 내역</p>
              </button>
            </Link>
            <Link to="mypage/likes">
              <button>
                <div className="mypage_img">
                  <img src="/assets/full_heart.png" />
                </div>
                <p>찜한 내역</p>
              </button>
            </Link>
          </div>
          <hr />
        </div>
        <MyFooter />
      </div>
    </mypage>
  );
};
export default MyPage;
