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
      <MyFooter />
    </div>
  );
};
export default MyPageSales;
