import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { getPostId } = useParams();
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
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
            break;
          default:
            console.error("Unexpected response status:", res.status);
        }
      });
  }, []);

  useEffect(() => {
    console.log(productInfo);
  }, [productInfo]);
  return (
    <div className="product-detail">
      <img className="product-img" src="/assets/logo.png" />
      <img className="prodile-img" src="/assets/profile_default.png" />
      <p className="profile-nickname">{productInfo.userNickname}</p>
    </div>
  );
};

export default ProductDetail;
