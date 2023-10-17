import React, { useState } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./ProductsCreate.css";

const ProductsRegister = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [ctgName, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    const selectedImage = Array.from(e.target.files);

    if (selectedImage.length <= 5) {
      const imageUrl = selectedImage.map((image) => ({
        url: URL.createObjectURL(image),
      }));

      setImage(imageUrl);
    } else {
      alert("최대 5장의 사진을 업로드할 수 있습니다.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      title,
      price,
      ctgName,
      details,
      image: image.map((image) => image.file),
    };

    try {
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      const response = await fetch("./products/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("상품이 성공적으로 업로드되었습니다.");
      } else {
        console.error("데이터 전송 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return (
    <div className="productcreate">
      <MyHeader />
      <div className="productcreate_body">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <hr />
          <input
            type="text"
            placeholder="가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <hr />
          <select value={ctgName} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>
              카테고리 선택
            </option>
            <option value="food">식품</option>
            <option value="electronic">전자기기</option>
            <option value="sports">스포츠 용품</option>
            <option value="clothes">의류</option>
            <option value="gagu">가구</option>
            <option value="etc">잡화</option>
          </select>
          <hr />
          <input
            className="product_info"
            type="text"
            placeholder="상품 내용"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <hr />
          <label className="file_select_label" htmlFor="file_select">
            <img src="/assets/createimg.png" />
            <p>
              사진 등록
              <br />
              (최대 5장)
            </p>
          </label>
          <input
            id="file_select"
            type="file"
            accept="image/*"
            name="image"
            multiple
            onChange={handleImageChange}
          />
          <div className="image-preview">
            {image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                className="preview-image"
                alt={`미리보기 ${index}`}
              />
            ))}
          </div>
          <hr />
          <button className="productcreate_button" type="submit">
            <p>등록하기</p>
          </button>
        </form>
      </div>
      <MyFooter />
    </div>
  );
};

export default ProductsRegister;
