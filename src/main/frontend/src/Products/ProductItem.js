import NumberFormat from "react-number-format";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-info">
        <div className="product-img">
          <img src="/assets/logo.png" />
        </div>
        <div className="product-description">
          <p className="product-title">{product.title}</p>
          <NumberFormat
            className="product-price"
            value={product.price}
            displayType="text"
            thousandSeparator={true}
            suffix="원"
          />
          <p className="product-town">서울 송파구 풍납동</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
