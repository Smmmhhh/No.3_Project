import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Product from "./Product";
import MyMain from "./MyMain";
import UsersEdit from "./UsersEdit";
import MyPage from "./MyPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/users" element={<UsersEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
