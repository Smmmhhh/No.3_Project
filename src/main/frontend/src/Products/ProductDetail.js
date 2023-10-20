import { useEffect, useRef, useState } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";

import NumberFormat from "react-number-format";
import MyHeader from "../MyHeader";
import MyFooter from "../MyFooter";

import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";

import "./ProductDetail.css";

const ProductDetail = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("userData")); // 로그인 정보 세션
  const { getPostId } = useParams(); // pathVariable 값
  const [productInfo, setProductInfo] = useState({}); // 등록된 제품 정보
  const [currentUserInfo, setCurrentUserInfo] = useState([]); // 현재 로그인한 유저의 정보
  const [userConnect, setUserConnect] = useState(false); //현재 로그인한 유저 접속 유무
  const [heart, setHeart] = useState(false); // 찜하트

  // 이미지 관련
  const imageBox = useRef(null);
  const [num, setNum] = useState(1);
  const [carouseTransition, setcarouseTransition] = useState(
    "transform 500ms ease-in-out"
  );
  const [originalImage, setOriginalImage] = useState([]); // 원본 이미지 배열
  const [cloneImages, setCloneImages] = useState([]); // 무한 슬라이드
  const lastImage = cloneImages.length - 1; // 마지막 이미지
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (currentUser) {
      setCurrentUserInfo(currentUser.data);
      setUserConnect(true);
    }
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
            setOriginalImage(res.data.image);
            break;
          case 409:
            alert("존재하지 않는 게시글 입니다.");
            navigate("/products/", { replace: true });
            break;
          default:
            console.error("Unexpected response status:", res.status);
        }
      });
  }, []);

  useEffect(() => {
    handleImage();
    console.log(originalImage);
  }, [originalImage]);

  useEffect(() => {
    if (num === lastImage) handleOriginSlide(1);
    else if (num === 0) handleOriginSlide(lastImage - 1);
  }, [cloneImages.length, lastImage, num]);

  useEffect(() => {
    console.log(cloneImages);
  }, [cloneImages]);

  // handler
  const handleImage = () => {
    const newCloneImages = [
      originalImage[originalImage.length - 1],
      ...originalImage,
      originalImage[0],
    ];
    setCloneImages(newCloneImages);
  };

  const handleChatBtn = () => {
    if (userConnect) {
      // 채팅창으로 데이터 들고 이동
      navigate("/chat");
    } else {
      alert(
        "로그인 후 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      navigate("/login", { replace: true });
    }
  };

  const handleHeartToggle = () => {
    setHeart(!heart);
  };

  function handleSlide(direction) {
    if (direction === "prev") {
      setNum((num) => num - 1);
    } else {
      setNum((num) => num + 1);
    }
    setcarouseTransition("transform 500ms ease-in-out");
  }

  function handleOriginSlide(index) {
    setTimeout(() => {
      setNum(index);
      setcarouseTransition("");
    }, 500);
  }

  return (
    <div className="product-detail">
      <MyHeader />
      <div className="product-info">
        <div className="image-slide">
          <button
            className="prev-slide"
            onClick={() => {
              handleSlide("prev");
            }}
          >
            <IoArrowBackOutline size={30} color="#333" />
          </button>
          <div
            className="main-images"
            style={{
              transition: `${carouseTransition}`,
              transform: `translateX(-${num}00%)`,
            }}
            ref={imageBox}
          >
            {cloneImages.map((image, i) => {
              return <img className="product-img" key={i} src={image} />;
            })}
          </div>

          <button
            className="next-slide"
            onClick={() => {
              handleSlide("next");
            }}
          >
            <IoArrowForward size={30} color="#333" />
          </button>
        </div>

        <div>
          {originalImage.map((dot) => {
            return (
              <div
                key={dot.src}
                onClick={() => {
                  setNum(dot.id + 1);
                }}
              />
            );
          })}
        </div>

        <div className="seller-info">
          <img className="profile-img" src="/assets/profile_default.png" />
          <span className="seller-name">
            <p className="board-nickname">{productInfo.userNickname}</p>
            <p className="board-town">{productInfo.addressName}</p>
          </span>
          <img className="grade" src="/assets/grade1.png" />
        </div>
        <hr />
        <div className="product-description">
          <div className="desc-top">
            <p className="product-title">{productInfo.title}</p>
            {heart ? (
              <img
                onClick={handleHeartToggle}
                className="heart"
                src="/assets/full_heart.png"
              />
            ) : (
              <img
                onClick={handleHeartToggle}
                className="heart"
                src="/assets/empty-heart.png"
              />
            )}
          </div>
          <p className="product-ctg">{productInfo.ctgName}</p>
          <NumberFormat
            className="product-price"
            value={productInfo.price}
            displayType="text"
            thousandSeparator={true}
            suffix="원"
          />
          <p className="product-desc">{productInfo.details}</p>
        </div>
        <hr />
        <button className="chat-btn" onClick={handleChatBtn}>
          채팅하기
        </button>
      </div>

      <MyFooter />
    </div>
  );
};

export default ProductDetail;
