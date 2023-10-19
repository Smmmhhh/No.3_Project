import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Products.css";

import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";
import ProductItem from "./ProductItem";

import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";

const Products = () => {
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열 //
  const [isOpen, setIsOpen] = useState(false); // 주소 모달창 //
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

  useEffect(() => {
    console.log(jibunAddress);
    if (jibunAddress) {
      fetch(`/products/region/${jibunAddress}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res1) => {
          console.log(res1.status);
          switch (res1.status) {
            case 200:
              setProducts(res1.data);
              break;
            case 400:
              setProducts([]);
              break;
            default:
              console.error("Unexpected response status:", res1.status);
          }
        });
    }
  }, [jibunAddress]);

  // 모달창의 정보 가져오기 //
  const completeHandler = (data) => {
    const formattedAddress = `${data.sido}/${data.sigungu}/${data.bname}`;
    setJibunAddress(formattedAddress);
    setIsOpen(false);
  };

  // 검색 클릭 //
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Modal 스타일 //
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "650px",
      height: "400px",
      padding: "0",
      overflow: "hidden",
    },
  };

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
          <div className="seach-town" onClick={toggle}>
            <input
              id="address"
              type="button"
              onClick={toggle}
              value={"주소 검색"}
            />
            <input
              name="userAddress"
              id="userAddress"
              type="text"
              value={jibunAddress}
              onChange={() => {}}
              placeholder="나무시 죽순구 새싹동"
              required
              disabled
            />
            <div className="post_code_modal">
              <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostCode onComplete={completeHandler} />
              </Modal>
            </div>
          </div>
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
