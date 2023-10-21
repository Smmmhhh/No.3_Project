import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyPageRegister.css";
import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";
import MyPageForm from "./MyPageForm";
import NumberFormat from "react-number-format";

const MypageRegister = () => {
  const [userNo, setUserNo] = useState(0);
  const [register, setRegister] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserNo(userData.data.userNo);

      fetch(`/mypage/register/${userData.data.userNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setRegister(res.data);
          }
        })
        .catch((error) => {
          console.error("오류:", error);
        });
    }
  }, []);

  return (
    <div>
      <div className="register_List">
        <MyHeader />
        <MyPageForm />
        <h2 className="register_h2">등록 내역</h2>
        {register.map((product) => (
          <div className="register_List_form" key={product.postId}>
            <div className="mypage_register_left">
              <img className="register_List_img" src={product.image} />
              <div className="register_List_text">
                <h3>{product.title}</h3>
                <NumberFormat
                  className="register_price"
                  value={product.price}
                  displayType="text"
                  thousandSeparator={true}
                  suffix="원"
                />
              </div>
            </div>
            <div className="register_edit_btn">
              <Link to={`/mypage/productsedit/${product.postId}`}>
                <p className="register_edit_btn_p">수정하기</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <MyFooter />
    </div>
  );
};
export default MypageRegister;
