import NumberFormat from "react-number-format";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="product-item"
      onClick={() => {
        navigate(`/products/detail/${product.postId}`);
      }}
    >
      <div className="product-info">
        <div className="product-img">
          <img src={product.image} />
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
          <p className="product-town">{product.addressName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
