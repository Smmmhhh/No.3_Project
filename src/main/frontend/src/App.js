import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Products from "./Products/Products";
import MyMain from "./MyMain";
import MyPage from "./MyPage/MyPage";
import TransActionComplete from "./TransActionComplete/TransactionComplete";
import Admin from "./Admin/Admin";
import AdminPost from "./Admin/AdminPost";
import AdminUser from "./Admin/AdminUser";
import ProductsEdit from "./Products/ProductsEdit";
import ProductsRegister from "./Products/ProductsRegister";
import MyPageSales from "./MyPage/MyPageSales";
import MyPagePurchases from "./MyPage/MyPagePurchases";
import MyPageRegister from "./MyPage/MyPageRegister";
import MyPageLikes from "./MyPage/MyPageLikes";
// import Image from "./Products/Image";
import MyPageUsers from "./MyPage/MyPageUsers";
import ProductDetail from "./Products/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/TransActionComplete" element={<TransActionComplete />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/products/register" element={<ProductsRegister />} />
        <Route path="/mypage/productsedit" element={<ProductsEdit />} />
        <Route path="/mypage/users" element={<MyPageUsers />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/post" element={<AdminPost />} />
        <Route path="/mypage/sales" element={<MyPageSales />} />
        <Route path="/mypage/purchases" element={<MyPagePurchases />} />
        <Route path="/mypage/register" element={<MyPageRegister />} />
        <Route path="/mypage/likes" element={<MyPageLikes />} />
        <Route path="/products/detail/:getPostId" element={<ProductDetail />} />
        {/* <Route path="/upload/image" element={<Image />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
