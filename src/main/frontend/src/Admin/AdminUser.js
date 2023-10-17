import React, { useState, useEffect } from "react";
import "./Admin.css";
import Admin from "./Admin";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch("/admin/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUsers(userData.data);
        console.log(userData);
      } else {
        alert("회원정보 불러오기 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
  };

  return (
    <div>
      <Admin />
      <h2 className="admin_h2">회원 관리</h2>
      <div className="admin_user_nav">
        <p>유저 번호</p>
        <p>닉네임</p>
        <p>이름</p>
        <p>아이디</p>
        <p>전화번호</p>
        <p>거래횟수</p>
        <p>등급</p>
        <p>총 게시글 수</p>
        <p>탈퇴 유무</p>
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user_value" key={user.userNo}>
              <p>{user.userNo}</p>
              <p>{user.userNickname}</p>
              <p>{user.userName}</p>
              <p>{user.userId}</p>
              <p>{user.userPhoneno}</p>
              <p>{user.transactionCount}</p>
              <p>{user.userGrade}</p>
              <p>{user.postCount}</p>
              <p>{user.userValidity}</p>
            </div>
          ))
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUser;
