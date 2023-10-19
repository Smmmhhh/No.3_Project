import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { getPostId } = useParams();
  const [productInfo, setProductInfo] = useState({
    postId: 0,
    userNickname: "",
    title: "",
    price: "",
    ctgName: "",
    details: "",
    addressName: "",
    image: [],
  });

  useEffect(() => {
    const res = fetch(`/products/detail/${getPostId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);
  return (
    <div className="product-detail">
      <img className="product-img" src="/assets/logo.png" />
      <img className="prodile-img" src="/assets/profile_default.png" />
      {/* <p className="profile-nickname">{productInfo.userNickname}</p> */}
    </div>
  );
};

export default ProductDetail;
