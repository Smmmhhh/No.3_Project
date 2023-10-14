import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Products from "./Products/Products";
import MyMain from "./MyMain";
import UsersEdit from "./UsersEdit";
import MyPage from "./MyPage/MyPage";
import TransActionComplete from "./TransActionComplete/TransactionComplete";
import Admin from "./Admin/Admin";
import AdminProduct from "./Admin/AdminProduct";
import AdminUser from "./Admin/AdminUser";
import ProductsCreate from "./Products/ProductsCreate";
import ProductsEdit from "./Products/ProductsEdit";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/users" element={<UsersEdit />} />
        <Route path="/TransActionComplete" element={<TransActionComplete />} />
        <Route path="/admin/" element={<Admin />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/productscreate" element={<ProductsCreate />} />
        <Route path="/mypage/productsedit" element={<ProductsEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
