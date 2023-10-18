import React, { useState, useEffect } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./ProductsCreate.css";
import Modal from "react-modal";
import DaumPostCode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const ProductsRegister = () => {
  const [userNo, setUserNo] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [ctgName, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열 //
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserNo(userData.data.userNo);
      console.log(formData);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    const formData = new FormData();
    formData.append("userNo", userNo);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("ctgName", ctgName);
    formData.append("details", details);
    formData.append("jibunAddress", jibunAddress);
    image.forEach((img) => {
      formData.append("multipartFiles", img);
    });
    console.log("userNo:", userNo);
    console.log("title:", title);
    console.log("price:", price);
    console.log("ctgName:", ctgName);
    console.log("details:", details);
    console.log("jibunAddress:", jibunAddress);
    console.log("image:", image);

    const productsPostRequest = {
      userNo: "userNo",
      title: "title",
      price: "price",
      ctgName: "ctgName",
      details: "details",
      jibunAddress: "jibunAddress",
    };
    formData.append("productsPostRequest", JSON.stringify(productsPostRequest));

    try {
      const response = await fetch("/products/register", formData, {
        methods: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("상품이 성공적으로 업로드되었습니다.");
      } else {
        console.error("데이터 전송 실패");
        const responseData = response.data;
        console.error(responseData);
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  // 나머지 코드는 동일하게 유지됩니다.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setJibunAddress(formattedAddress);

    setFormData({ ...formData, userAddress: formattedAddress });
    setIsOpen(false);
  };

  // Modal 스타일 //

  // 검색 클릭 //

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

  return (
    <div className="productcreate">
      <MyHeader />
      <div className="productcreate_body">
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
              value={jibunAddress}
              onChange={handleInputChange}
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
        <button
          onClick={handleFormSubmit}
          className="productcreate_button"
          type="submit"
        >
          <p>등록하기</p>
        </button>
      </div>
      <MyFooter />
    </div>
  );
};

export default ProductsRegister;
