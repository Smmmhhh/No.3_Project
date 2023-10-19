import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DaumPostCode from "react-daum-postcode";
import "./ProductsCreate.css";
import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";



const ImageUploadComponent = () => {
  const [userNo, setUserNo] = useState(0);
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addressName, setaddressName] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [productData, setProductData] = useState({
    userNo: userNo,
    title: "",
    price: 0,
    ctgName: "",
    details: "",
    addressName: "",
  });
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setProductData((prevProductData) => ({
        ...prevProductData,
        userNo: userData.data.userNo,
      }));
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
    if (selectedFiles.length <= 5) {
      const selectedPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview([...imagePreview, ...selectedPreviews]);
    } else {
      alert("최대 5장의 사진을 업로드할 수 있습니다.");
    }
  };

  const renderImagePreviews = imagePreview.map((preview, index) => (
    <img src={preview} key={index} alt={`Preview ${index}`} />
  ));

  const handleUpload = () => {
    const formData = new FormData();

    // 이미지 파일 추가
    files.forEach((file, index) => {
      formData.append(`multipartFiles`, file);
    });

    // 상품 데이터 추가
    const jsonData = JSON.stringify(productData);
    const jsonBlob = new Blob([jsonData], { type: "application/json" });
    formData.append("productsPostRequest", jsonBlob);

    fetch("/products/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image and data upload successful", data);
      })
      .catch((error) => {
        console.error("Error uploading images and data:", error);
      });
  };

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
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const completeHandler = (data) => {
    const formattedAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    setaddressName(formattedAddress);
    setProductData({ ...productData, addressName: formattedAddress });
    setIsOpen(false);
  };
  return (
    <div className="productcreate">
      <MyHeader />
      <div className="productcreate_body">
        <input
          placeholder="제목"
          type="text"
          value={productData.title}
          onChange={(e) =>
            setProductData({ ...productData, title: e.target.value })
          }
        />
        <hr />
        <input
          placeholder="가격"
          type="text"
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
        />
        <hr />
        <select
          type="text"
          value={productData.ctgName}
          onChange={(e) =>
            setProductData({ ...productData, ctgName: e.target.value })
          }
        >
          <option value="" disabled>
            카테고리 선택
          </option>
          <option value="식품">식품</option>
          <option value="전자기기">전자기기</option>
          <option value="스포츠용품">스포츠 용품</option>
          <option value="의류">의류</option>
          <option value="가구">가구</option>
          <option value="잡화">잡화</option>
        </select>
        <hr />
        <input
          className="product_info"
          type="text"
          placeholder="상품 설명"
          value={productData.details}
          onChange={(e) =>
            setProductData({ ...productData, details: e.target.value })
          }
        />
        <hr />

        <div className="info_section" onClick={toggle}>
          <div className="item">
            <label htmlFor="mytown">동네 설정</label>
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
              value={productData.addressName}
              onChange={(e) =>
                setProductData({ ...productData, addressName: e.target.value })
              }
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
        <hr />
        <h4>판매글 이미지 등록</h4>
        <p>(최대 5장)</p>

        <input
          className="image-preview"
          type="file"
          onChange={handleFileChange}
          multiple
        />

        <div className="preview-image">{renderImagePreviews}</div>
      </div>

      <button className="productcreate_button" onClick={handleUpload}>
        <p>등록하기</p>
      </button>
      <MyFooter />
    </div>
  );
};

export default ImageUploadComponent;
