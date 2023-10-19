import { useState, useEffect } from "react";
import MyPage from "./MyPage";
import "./MyPageList.css";
const MyPageLikes = () => {
  const [userNo, setUserNo] = useState(0);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setUserNo(userData.data.userNo);

      fetch(`/mypage/sales/${userData.data.userNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setLikes(res.data);
          }
        })
        .catch((error) => {
          console.error("오류:", error);
        });
    }
  }, []);
  return (
    <div className="mypage_List">
      <MyPage showFooter={false} />
      <div className="List_form">
        {likes.map((likes) => (
          <div key={likes.postId}>
            <img className="List_img" src={likes.image} />
            <div className="List_text">
              <h3>{likes.title}</h3>
              <p>{likes.price}</p>
            </div>
          </div>
        ))}
        <img className="like_img" src="/assets/full_heart.png" />
      </div>
    </div>
  );
};
export default MyPageLikes;
