import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Modal from "react-modal";
import DaumPostCode from "react-daum-postcode";

import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./ProductsEdit.css";

import { Link, useNavigate, useParams } from "react-router-dom";

const ProductsEdit = () => {
  const { postId } = useParams(); // path Valiable
  const [userNo, setUserNo] = useState(0);
  const [originData, setOriginData] = useState({}); // 원본 데이터
  const [modifyData, setModifyData] = useState({
    // 변경 데이터
    userNo: -1,
    title: "",
    price: "",
    ctgName: "",
    details: "",
    addressName: "",
    image: [],
  });
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열
  const [isOpen, setIsOpen] = useState(false); // 주소 모달창
  const [files, setFiles] = useState([]); // 이미지 저장 배열
  const [imagePreview, setImagePreview] = useState([]);
  const [showImg, setShowImg] = useState(true); // 등록되어 있는 이미지 보여주는 역할

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setModifyData((prevProductData) => ({
        ...prevProductData,
        userNo: userData.data.userNo,
      }));
      console.log(userData.data.image);
    }
  }, []);

  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    fetch(`/mypage/productsedit/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        switch (res.status) {
          case 200:
            setOriginData(res.data);
            setModifyData(res.data);
            break;
          case 409:
            break;
          default:
            console.error("Unexpected response status:", res.status);
        }
      });
  }, []);

  useEffect(() => {
    console.log(originData);
    console.log("modifyData: ", modifyData);
  }, [originData, modifyData]);

  // handler
  // input 태그
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifyData({ ...modifyData, [name]: value });
  };

  // 모달창의 정보 가져오기
  const completeHandler = (data) => {
    const formattedAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    setJibunAddress(formattedAddress);
    setModifyData({ ...modifyData, addressName: formattedAddress });
    setIsOpen(false);
  };

  // Modal 스타일
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

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShowImg = () => {
    setShowImg(false);
  };

  // modify 변경이 없을 경우 / 공백인 경우
  const handleValueChange = () => {
    if (!modifyData.userNo) {
      setModifyData({ ...modifyData, userNo: originData.userNo });
    } else if (!modifyData.title) {
      setModifyData({ ...modifyData, title: originData.title });
    } else if (!modifyData.price) {
      setModifyData({ ...modifyData, price: originData.price });
    } else if (!modifyData.details) {
      setModifyData({ ...modifyData, details: originData.details });
    } else if (!modifyData.ctgName) {
      setModifyData({ ...modifyData, ctgName: originData.ctgName });
    } else if (!modifyData.addressName) {
      setModifyData({ ...modifyData, addressName: originData.addressName });
    }
  };

  // 이미지 선택 최대 장수 지정
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
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
  // 게시글 수정 버튼 클릭
  const handleUpUpadate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`multipartFiles`, file);
    });

    const jsonData = JSON.stringify(modifyData);
    const jsonBlob = new Blob([jsonData], { type: "application/json" });
    formData.append("productsPostRequest", jsonBlob);

    try {
      const response = await fetch(`/mypage/productsedit/${postId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status === 200) {
        alert("업데이트 완료");
        navigate(`/mypage/register/${originData.userNo}`, { replace: true });
      } else {
        alert("업데이트 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    try {
      const response = await fetch(`/mypage/products/delete/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate(`/mypage/register/${originData.userNo}`, { replace: true });
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
      <h2 className="productsedit_h2">나의 물건 정보 수정</h2>
      <div className="productedit_body">
        <input
          type="text"
          name="title"
          value={modifyData.title}
          onChange={(e) => {
            setModifyData({ ...modifyData, title: e.target.value });
          }}
        />
        <hr />
        <NumberFormat
          value={modifyData.price}
          thousandSeparator={true}
          suffix="원"
          onValueChange={(values) => {
            const { formattedValue, value } = values;
            setModifyData({ ...modifyData, price: value });
          }}
          inputMode="decimal"
        />
        <hr />
        <select
          value={modifyData.ctgName}
          onChange={(e) => {
            setModifyData({ ...modifyData, ctgName: e.target.value });
          }}
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
          type="text"
          name="details"
          value={modifyData.details}
          onChange={handleInputChange}
        />
        <hr />
        <div>
          <p>거래 희망 장소</p>
          <div className="town-info">
            <button onClick={toggle}>주소 검색</button>
          </div>
          <input
            id="update_address"
            value={jibunAddress === "" ? modifyData.addressName : jibunAddress}
          />
          <div className="post_code_modal">
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
              <DaumPostCode onComplete={completeHandler} />
            </Modal>
          </div>
          <hr />
          <div className="img_input">
            <label className="file_select_label" htmlFor="file_select"></label>
            <h4>수정 이미지 등록</h4>
            <p>(최대 5장)</p>
            <input
              className="image-preview"
              type="file"
              onClick={handleShowImg}
              onChange={handleImageChange}
              multiple
            />
            {showImg &&
              modifyData.image.map((img, index) => (
                <img key={index} src={img} alt={`Image ${index}`} />
              ))}
          </div>

          <div className="preview-image">{renderImagePreviews}</div>
          <hr />
        </div>
        <div className="productedit_btn">
          <Link to={`/mypage/register/${userNo}`}>
            <button
              onClick={handleUpUpadate}
              className="productedit_submit_btn"
              type="submit"
            >
              수정하기
            </button>
          </Link>
          <Link to={`/mypage/register/${userNo}`}>
            <button className="productedit_delete_btn" onClick={handleDelete}>
              삭제하기
            </button>
          </Link>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default ProductsEdit;
