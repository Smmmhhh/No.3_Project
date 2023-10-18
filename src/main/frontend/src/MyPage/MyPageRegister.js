import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyPage from "./MyPage";

const MypageRegister = () => {
  const [userData, setUserData] = useState(0);
  const [Register, setRegister] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserData((prevProductData) => ({
        ...prevProductData,
        userNo: userData.data.userNo,
      }));
    }
  }, []);

  const loadRegister = async () => {
    try {
      const response = await fetch("/mypage/register", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const RegisterData = await response.json();
        setRegister(RegisterData.data);
        console.log(RegisterData);
      } else {
        <p>구매목록 불러오기 실패</p>;
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };
  return (
    <div>
      <MyPage />
      <Link to={`/mypage/productsEdit/${userData.data.UserNo}`}>
        <p>수정하기</p>
      </Link>
    </div>
  );
};
export default MypageRegister;
