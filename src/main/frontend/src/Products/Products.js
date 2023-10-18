import { useEffect, useState } from "react";

import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";
import ProductItem from "./ProductItem";

import "./Products.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      });
  }, []);

  return (
    <div className="products">
      <MyHeader />
      <div className="products-container">
        <h2>중고 거래 전체 매물</h2>
        <div className="top-menu">
          <button
            className="create-product-btn"
            onClick={() => navigate("/products/register")}
          >
            내 물건 팔기
          </button>
          <div></div>
          {/* 주소 입력하는 거 들어가야됨 */}
        </div>
        <br />

        <div className="product-item">
          {products.length === 0 && (
            <p className="no-products">아직 등록된 매물이 없습니다.</p>
          )}
          {products.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
      </div>

      <MyFooter />
    </div>
  );
};
export default Products;
