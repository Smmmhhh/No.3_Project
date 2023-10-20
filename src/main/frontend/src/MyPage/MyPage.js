import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import MyPageForm from "./MyPageForm";
import "./MyPageForm.css";
const MyPage = () => {
  return (
    <div>
      <div className="header_mypage">
        <MyHeader />
        <MyPageForm />
      </div>
      <div className="footer">
        <div className="footer_section">
          <p>
            ∙ 사업자명 : 윤나무 ∙ 사업자번호 : 111-11-11111 ∙ 직업정보 제공사업
            신고번호 : J1122334455667
          </p>
          <p>
            ∙ 전화번호 : 1544-0000 ∙ 주소 : 서울특별시 나무구 나무로 28길 30,
            1001호 (나무마켓)
          </p>
        </div>
        <img src="/assets/logo.png" />
      </div>
    </div>
  );
};
export default MyPage;
