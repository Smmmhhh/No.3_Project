import { useEffect, useState } from "react";
import MyPage from "./MyPage";

const MyPageSales = () => {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    loadSales();
  }, []);
  const loadSales = async () => {
    try {
      const response = await fetch("/mypage/sales", {
        method: "GET",
      });
      if (response.ok) {
        const loadData = await response.json();
        setSales(loadSales.data);
      } else {
        alert("판매내역 불러오기 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };
  return (
    <div>
      <MyPage />
      <div>
        {sales.length > 0 ? (
          sales.map((sales) => (
            <div className="sales_value" key={sales.postId}>
              <img src={sales.image} />
              <p>{sales.title}</p>
              <p>{sales.price}</p>
            </div>
          ))
        ) : (
          <p>구매 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default MyPageSales;
