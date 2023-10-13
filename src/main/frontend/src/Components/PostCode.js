import { useState, useEffect } from "react";
import DaumPostCode from "react-daum-postcode";
import Modal from "react-modal";

// $ npm install react-daum-postcode
// $ npm install react-madal

const PostCode = (props) => {
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

  // jibunAddress 값이 변경될 때 실행되는 useEffect
  useEffect(() => {
    // jibunAddress 값이 변경될 때마다 로그 출력
    console.log("jibunAddress 값이 변경되었습니다: ", jibunAddress);
  }, [jibunAddress]);

  // useEffect(() => {
  //   // jibunAddress가 변경된 경우에만 props.handleInputChange를 호출
  //   if (jibunAddress !== props.userAddress) {
  //     console.log({props.userAddress});
  //     props.handleInputChange({
  //       target: { name: "userAddress", value: jibunAddress },
  //     });
  //   }
  // }, [jibunAddress, props]);

  return (
    <div className="post_code" onClick={toggle}>
      <input id="address" type="button" onClick={toggle} value={"주소 검색"} />
      <input
        name="userAddress"
        id="userAddress"
        type="text"
        value={jibunAddress}
        // value={jibunAddress === "" ? "나무시 죽순구 새싹동" : jibunAddress}
        onChange={props.handleInputChange}
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
  );
};

export default PostCode;
