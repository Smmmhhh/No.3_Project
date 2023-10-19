import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NumberFormat from "react-number-format";
import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";

const ProductDetail = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  const { getPostId } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [userConnect, setUserConnect] = useState(false);
  const navigate = useNavigate();

  const handleChatBtn = () => {
    if (userConnect) {
      // 채팅창으로 데이터 들고 이동
      navigate("/chat");
    } else {
      alert(
        "로그인 후 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserInfo(currentUser.data);
      setUserConnect(true);
    }
    fetch(`/products/detail/${getPostId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case 200:
            setProductInfo(res.data);
            break;
          case 409:
            alert("존재하지 않는 게시글 입니다.");
            navigate("/products/", { replace: true });
            break;
          default:
            console.error("Unexpected response status:", res.status);
        }
      });
  }, []);

  return (
    <div className="product-detail">
      <MyHeader />
      <img className="product-img" src="/assets/logo.png" />
      <img className="prodile-img" src="/assets/profile_default.png" />
      <p className="board-nickname">{productInfo.userNickname}</p>
      <p className="board-town">{productInfo.addressName}</p>
      <img src="/assets/grade1.png" />
      <hr />
      <p>{productInfo.title}</p>
      <img src="/assets/empty-heart.png" />
      <p>{productInfo.ctgName}</p>
      <NumberFormat
        value={productInfo.price}
        displayType="text"
        thousandSeparator={true}
        suffix="원"
      />
      <p>{productInfo.details}</p>
      <hr />
      <button onClick={handleChatBtn}>채팅하기</button>
      <MyFooter />
    </div>
  );
};

export default ProductDetail;
