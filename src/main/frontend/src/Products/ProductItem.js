import NumberFormat from "react-number-format";
import "./ProductItem.css";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="products-item"
      onClick={() => {
        navigate(`/products/detail/${product.postId}`);
      }}
    >
      <div className="products-data">
        <div className="products-image">
          <img src={product.image} />
        </div>
        <div className="products-description">
          <p className="products-title">{product.title}</p>
          <NumberFormat
            className="products-price"
            value={product.price}
            displayType="text"
            thousandSeparator={true}
            suffix="원"
          />
          <p className="products-town">{product.addressName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
