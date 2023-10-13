import { useRef } from "react";
import { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";

// $ npm install react-daum-postcode
// $ npm install react-madal

const PostCode = () => {
  const [jibunAddress, setJibunAddress] = useState(""); // 주소 정보 문자열
  const [isOpen, setIsOpen] = useState(false); // 모달창

  const completeHandler = (data) => {
    const formattedAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    setJibunAddress(formattedAddress);
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

  return (
    <div className="post_code" onClick={toggle}>
      <input id="address" type="button" onClick={toggle} value={"주소 검색"} />
      <input
        type="text"
        value={jibunAddress}
        placeholder="나무시 죽순구 새싹동"
        disabled
      />
      <div className="post_code_modal">
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
          <DaumPostCode onComplete={completeHandler} />
        </Modal>
      </div>
    </div>
  );
};

export default PostCode;
