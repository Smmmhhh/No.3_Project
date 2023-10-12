import React from "react";
import { Link } from "react-router-dom";

const MyHeader = () => {
    return (
        <header>
            <div className="header_left">
                <Link to="/" style={{ width: "200px" }}>
                    <img className="logo_img" src="/image/logo.png" />
                </Link>
                <Link to="/product">
                    <h1 className="category">중고 거래</h1>
                </Link>
            </div>
            <div className="search">
                <input type="text" />
                <img src="/image/search_img.png" />
            </div>
            <div className="header_right">
                <Link to="/login">
                    <p className="login">로그인</p>
                </Link>
                <Link to="/register">
                    <p className="register">회원가입</p>
                </Link>
            </div>
        </header>
    );
};
export default MyHeader;