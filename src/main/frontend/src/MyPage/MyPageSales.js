import { useEffect, useState } from "react";
import MyPage from "./MyPage";
import MyFooter from "../MyFooter";

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
    <div className="mypage_List">
      <MyPage showFooter={false} />
      <div className="List_form">
        {sales.map((sales) => (
          <div key={sales.postId}>
            <img className="List_img" src={sales.image} />
            <div className="List_text">
              <h3>{sales.title}</h3>
              <p>{sales.price}</p>
            </div>
          </div>
        ))}
      </div>
      <MyFooter />
    </div>
  );
};
export default MyPageSales;
