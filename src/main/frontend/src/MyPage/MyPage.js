import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import { Link } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="mypage">
      <MyHeader />
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
        <button>
          <div className="mypage_img">
            <img src="/assets/mypage_sales.png" />
          </div>
          <p>판매 내역</p>
        </button>
        <button>
          <div className="mypage_img">
            <img src="/assets/mypage_purchases.png" />
          </div>
          <p>구매 내역</p>
        </button>
        <button>
          <div className="mypage_img">
            <img src="/assets/mypage_register.png" />
          </div>
          <p>등록 내역</p>
        </button>
        <button>
          <div className="mypage_img">
            <img src="/assets/full_heart.png" />
          </div>
          <p>찜한 내역</p>
        </button>
      </div>
      <MyFooter />
    </div>
  );
};
export default MyPage;
