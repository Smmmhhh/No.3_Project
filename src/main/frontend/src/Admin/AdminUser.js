import "./Admin.css";
import Admin from "./Admin";

const AdminUser = () => {
  return (
    <div>
      <Admin />
      <div className="admin_user_nav">
        <p>유저번호</p>
        <p>이름</p>
        <p>아이디</p>
        <p>전화번호</p>
        <p>거래횟수</p>
        <p>등급</p>
        <p>총 게시글 수</p>
        <p>탈퇴 유무</p>
      </div>
    </div>
  );
};
export default AdminUser;
