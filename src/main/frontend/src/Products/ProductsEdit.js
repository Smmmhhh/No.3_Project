import React, { useState, useEffect } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./ProductsCreate.css";

const ProductsEdit = ({ productId }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [ctgName, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length <= 5) {
      const imageUrls = selectedImages.map((image) => ({
        url: URL.createObjectURL(image),
        file: image,
      }));

      setImage(imageUrls);
    } else {
      alert("최대 5장의 사진을 업로드할 수 있습니다.");
    }
  };
  const fetchProductData = async () => {
    try {
      const response = await fetch(`/api/mypage/productsedit/${productId}`);

      if (response.ok) {
        const productData = await response.json();
        setTitle(productData.title);
        setPrice(productData.price);
        setCategory(productData.ctgName);
        setDetails(productData.details);
        setImage(productData.image);
      } else {
        console.error("데이터 불러오기 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedProductData = {
      title,
      price,
      ctgName,
      details,
      image,
    };

    try {
      const response = await fetch(`/api/mypage/productsedit/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        alert("상품이 성공적으로 수정되었습니다.");
      } else {
        console.error("데이터 수정 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/mypage/productsedit/delete/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("상품이 성공적으로 삭제되었습니다.");
      } else {
        console.error("데이터 삭제 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return (
    <div className="productedit">
      <MyHeader />
      <div className="productedit_body">
        <form onSubmit={handleEditSubmit}>
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
          <div className="productedit_btn">
            <button className="productedit_submit" type="submit">
              <p>수정하기</p>
            </button>
            <button className="productedit_delete" onClick={handleDelete}>
              <p>삭제하기</p>
            </button>
          </div>
        </form>
      </div>
      <MyFooter />
    </div>
  );
};

export default ProductsEdit;
