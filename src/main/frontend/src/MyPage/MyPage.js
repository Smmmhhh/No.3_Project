import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import MyPageForm from "./MyPageForm";

const MyPage = () => {
  return (
    <div>
      <div className="header_mypage">
        <MyHeader />
        <MyPageForm />
      </div>
      <MyFooter />
    </div>
  );
};
export default MyPage;
