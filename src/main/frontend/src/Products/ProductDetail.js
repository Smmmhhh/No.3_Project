import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NumberFormat from "react-number-format";
import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";

import "./ProductDetail.css";

const ProductDetail = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  const { getPostId } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [userConnect, setUserConnect] = useState(false);
  const [heart, setHeart] = useState(false);

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

  const handleHeartToggle = () => {
    setHeart(!heart);
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
      <div className="product-info">
        <div className="main-images">
          <img className="product-img" src="/assets/logo.png" />
        </div>

        <div className="seller-info">
          <img className="profile-img" src="/assets/profile_default.png" />
          <span className="seller-name">
            <p className="board-nickname">{productInfo.userNickname}</p>
            <p className="board-town">{productInfo.addressName}</p>
          </span>
          <img className="grade" src="/assets/grade1.png" />
        </div>
        <hr />
        <div className="product-description">
          <div className="desc-top">
            <p className="product-title">{productInfo.title}</p>
            {heart ? (
              <img
                onClick={handleHeartToggle}
                className="heart"
                src="/assets/full_heart.png"
              />
            ) : (
              <img
                onClick={handleHeartToggle}
                className="heart"
                src="/assets/empty-heart.png"
              />
            )}
          </div>
          <p className="product-ctg">{productInfo.ctgName}</p>
          <NumberFormat
            className="product-price"
            value={productInfo.price}
            displayType="text"
            thousandSeparator={true}
            suffix="원"
          />
          <p className="product-desc">{productInfo.details}</p>
        </div>
        <hr />
        <button className="chat-btn" onClick={handleChatBtn}>
          채팅하기
        </button>
      </div>

      <MyFooter />
    </div>
  );
};

export default ProductDetail;
