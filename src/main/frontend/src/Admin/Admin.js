import "./Admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <admin>
      <div className="admin_header">
        <img src="/assets/logo.png" />
        <h2>관리자 페이지</h2>
        <Link to="/">
          <button>로그아웃</button>
        </Link>
      </div>
      <div className="admin_onclick">
        <Link to="/admin/post">
          <button className="admin_onclick_button1">게시글 관리</button>
        </Link>
        <Link to="/admin/user">
          <button className="admin_onclick_button2">회원 관리</button>
        </Link>
      </div>
      <div className="admin_search">
        <input type="text" />
        <img src="/assets/search_img.png" />
      </div>
    </admin>
  );
};
export default Admin;
