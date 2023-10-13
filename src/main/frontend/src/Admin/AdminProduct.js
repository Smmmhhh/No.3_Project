import "./Admin.css";
import Admin from "./Admin";
const AdminProduct = () => {
  return (
    <div>
      <Admin />
      <div className="admin_product_nav">
        <p>
          게시글
          <br />
          번호
        </p>
        <p>이미지</p>
        <p>제목</p>
        <p>동네</p>
        <p>가격</p>
        <p>
          게시글
          <br />
          등록자
        </p>
        <p>게시일</p>
        <p>
          게시글
          <br />
          상태
        </p>
      </div>
    </div>
  );
};
export default AdminProduct;
