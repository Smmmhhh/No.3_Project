import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./TransActionComplete.css";

const TransActionComplete = () => {
  return (
    <div className="transaction">
      <MyHeader />
      <img className="complete_img" src="/assets/transactioncomplete.png" />
      <hr />
      <h1 className="complete_h1">거래가 완료 되었습니다.</h1>
      <p className="complete_p">이용해주셔서 감사합니다.</p>
      <MyFooter />
    </div>
  );
};
export default TransActionComplete;
