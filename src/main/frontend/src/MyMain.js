import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";

const MyMain = () => {
  return (
    <div>
      <MyHeader />
      <div className="main_img1_box">
        <img src="/image/mainimg1.png" />
      </div>
      <div className="main_img2_box">
        <img src="/image/mainimg2.png" />
      </div>
      <MyFooter />
    </div>
  );
};
export default MyMain;
