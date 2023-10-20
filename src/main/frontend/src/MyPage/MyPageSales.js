import { useEffect, useState } from "react";
import MyPageForm from "./MyPageForm";
import MyFooter from "../MyFooter";
import NumberFormat from "react-number-format";
import MyHeader from "../MyHeader";

const MyPageSales = () => {
  const [userNo, setUserNo] = useState(0);
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserNo(userData.data.userNo);

      fetch(`/mypage/sales/${userData.data.userNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setSales(res.data);
          }
        })
        .catch((error) => {
          console.error("오류:", error);
        });
    }
  }, []);

  return (
    <div>
      <div className="mypage_List">
        <MyHeader />
        <MyPageForm />
        <h2 className="list_h2">판매 내역</h2>
        {sales.map((sales) => (
          <div className="mypage_List_form" key={sales.postId}>
            <img className="mypage_List_img" src={sales.image} />
            <div className="mypage_List_text">
              <h3>{sales.title}</h3>
              <NumberFormat
                className="mypage_price"
                value={sales.price}
                displayType="text"
                thousandSeparator={true}
                suffix="원"
              />
            </div>
          </div>
        ))}
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
export default MyPageSales;
