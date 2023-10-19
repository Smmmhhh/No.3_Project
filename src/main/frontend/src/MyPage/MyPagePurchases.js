import { useState, useEffect } from "react";
import MyPage from "./MyPage";
import MyFooter from "../MyFooter";

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
    <div className="mypage_List">
      <MyPage showFooter={false} />
      <div className="List_Form">
        {purchases.map((purchases) => (
          <div className="List_img" key={purchases.postId}>
            <img src={purchases.image} />
            <div className="List_text">
              <h3>{purchases.title}</h3>
              <p>{purchases.price}</p>
            </div>
          </div>
        ))}
      </div>
      <MyFooter />
    </div>
  );
};
export default MyPagePurchases;
