import { useState, useEffect } from "react";
import MyPageForm from "./MyPageForm";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./MyPageList.css";
import NumberFormat from "react-number-format";

const MyPagePurchases = () => {
  const [userNo, setUserNo] = useState(0);
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserNo(userData.data.userNo);

      fetch(`/mypage/purchases/${userData.data.userNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setPurchases(res.data);
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
        <h2 className="list_h2">구매 내역</h2>

        {purchases.map((purchases) => (
          <div className="mypage_List_form" key={purchases.postId}>
            <img className="mypage_List_img" src={purchases.image} />
            <div className="mypage_List_text">
              <h3>{purchases.title}</h3>
              <NumberFormat
                className="mypage_price"
                value={purchases.price}
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
export default MyPagePurchases;
