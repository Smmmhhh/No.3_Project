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
      <MyFooter />
    </div>
  );
};
export default MyPagePurchases;
