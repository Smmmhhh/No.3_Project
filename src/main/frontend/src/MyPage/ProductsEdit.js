import React, { useState, useEffect } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./ProductsEdit.css";
import Modal from "react-modal";
import DaumPostCode from "react-daum-postcode";
import { useParams } from "react-router-dom";
import NumberFormat from "react-number-format";

const ProductsEdit = () => {
  const { postId } = useParams();
  const [userNo, setUserNo] = useState(0);
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addressName, setaddressName] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [productData, setProductData] = useState({
    // title: "",
    // price: 0,
    // ctgName: "",
    // details: "",
    // addressName: "",
    // image: [],
  });
  const [updateproductData, setUpdateProductData] = useState({
    userNo: userNo,
    title: "",
    price: 0,
    ctgName: "",
    details: "",
    addressName: "",
    image: [],
  });

  const loadProductData = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUpdateProductData((prevProductData) => ({
        ...prevProductData,
        userNo: userData.data.userNo,
      }));

      fetch(`/mypage/productsedit/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("데이터 불러오기 성공", data);
          if (data.status === 200) {
            console.log("시발" + data.data.title);
            const loadedProductData = {
              title: data.data.title,
              price: data.data.price,
              ctgName: data.data.ctgName,
              details: data.data.details,
              addressName: data.data.addressName,
            };
            setProductData(loadedProductData);
          } else {
            console.error("데이터 불러오기 실패");
          }
        })
        .catch((error) => {
          console.error("오류:", error);
        });
    }
  };
  useEffect(() => {
    loadProductData();
  }, [postId]);

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

  const handleUpUpadate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`multipartFiles`, file);
    });

    const jsonData = JSON.stringify(updateproductData);
    const jsonBlob = new Blob([jsonData], { type: "application/json" });
    formData.append("productsPostRequest", jsonBlob);

    try {
      const response = await fetch(`/mypage/productsedit/${postId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.status === 200) {
        alert("업데이트 완료");
      } else {
        alert("업데이트 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/mypage/products/delete/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("상품이 성공적으로 삭제되었습니다.");
      } else {
        console.error("데이터 삭제 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
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
    setUpdateProductData({
      ...updateproductData,
      addressName: formattedAddress,
    });
    setIsOpen(false);
  };

  return (
    <div className="productedit">
      <MyHeader />
      <div className="productedit_body">
        <input
          type="text"
          placeholder={productData.title}
          value={updateproductData.title}
          onChange={(e) => {
            setUpdateProductData({
              ...updateproductData,
              title: e.target.value,
            });
          }}
        />

        <hr />

        <NumberFormat
          value={updateproductData.price}
          onValueChange={({ value }) => {
            setUpdateProductData({
              ...updateproductData,
              price: value,
            });
          }}
          thousandSeparator={true}
          suffix={"원"}
        />

        <hr />
        <select
          placeholder={productData.ctgName}
          value={updateproductData.ctgName}
          onChange={(e) => {
            setUpdateProductData({
              ...updateproductData,
              ctgName: e.target.value,
            });
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
          className="product_info"
          type="text"
          placeholder={productData.details}
          value={updateproductData.details}
          onChange={(e) => {
            setUpdateProductData({
              ...updateproductData,
              details: e.target.value,
            });
          }}
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
              value={updateproductData.addressName}
              onChange={(e) => {
                setUpdateProductData({
                  ...updateproductData,
                  ctgName: e.target.value,
                });
              }}
              placeholder={productData.addressName}
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
        <div className="img_input">
          <label className="file_select_label" htmlFor="file_select"></label>
          <p>사진 등록하기</p>
          <input
            className="image-preview"
            type="file"
            value={updateproductData.image}
            multiple
            onChange={handleImageChange}
          />
        </div>
        <hr />
        <div placeholder={productData.image} className="preview-image">
          {renderImagePreviews}
        </div>

        <div className="productedit_btn">
          <button
            onClick={handleUpUpadate}
            className="productedit_submit"
            type="submit"
          >
            <p>수정하기</p>
          </button>
          <button className="productedit_delete" onClick={handleDelete}>
            <p>삭제하기</p>
          </button>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default ProductsEdit;
