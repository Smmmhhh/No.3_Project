import "./Admin.css";
import Admin from "./Admin";
import React, { useState, useEffect } from "react";
const AdminPost = () => {
  const [post, setPost] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    loadPost();
  }, []);
  useEffect(() => {
    updatePostStatus();
  }, [selectedOptions]);
  const loadPost = async () => {
    try {
      const response = await fetch("/admin/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const postData = await response.json();
        setPost(postData.data);
      } else {
        alert("게시글 불러오기 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  const handleOptionChange = (postId, event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [postId]: { ...prevOptions[postId], [name]: value },
    }));

    // 서버에 업데이트 요청 보내기
    updatePostStatus(postId, value);
  };

  const updatePostStatus = async (postId, newStatus) => {
    try {
      const response = await fetch("/admin/post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          productStatus: newStatus,
        }),
      });
      if (response.ok) {
        console.log("게시물 상태가 업데이트되었습니다.");
      } else {
        alert("게시물 상태 업데이트 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };
  return (
    <div>
      <Admin />
      <div className="admin_product_nav">
        <p>
          게시글
          <br />
          번호
        </p>
        <p>이미지</p>
        <p>제목</p>
        <p>동네</p>
        <p>가격</p>
        <p>
          게시글
          <br />
          등록자
        </p>
        <p>게시일</p>
        <p>
          게시글
          <br />
          상태
        </p>
      </div>
      <div>
        {post.length > 0 ? (
          post.map((post) => (
            <div className="post_value" key={post.postId}>
              <p>{post.postId}</p>
              <img src={post.image} />
              <p>{post.title}</p>
              <p>
                {post.sido}
                <br />
                {post.sigungu}
                {post.town}
              </p>
              <p>{post.price}</p>
              <p>{post.userId}</p>
              <p>{post.creationDate}</p>
              <div className="post_select_form">
                <select
                  className="ost_select"
                  name="productStatus"
                  value={selectedOptions[post.postId]?.productStatus || ""}
                  onChange={(event) => handleOptionChange(post.postId, event)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>게시물 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default AdminPost;
