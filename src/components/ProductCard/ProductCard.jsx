import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const priceLabel = product.price ? `${product.price} EGP` : 'Price unavailable';

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          {product.isNew && <span className="badge">New</span>}
          {product.image ? (
            <img src={product.image} alt={product.name} loading="lazy" />
          ) : (
            <div className="image-placeholder">📦</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price-section">
            <p className="product-price">{priceLabel}</p>
          </div>
        </div>
      </Link>
      {onAddToCart && (
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;

