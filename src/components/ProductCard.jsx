import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites, isFavorite } from '../utils/favorites';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(product.id));
  }, [product.id]);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(product.id);
      setFavorite(false);
    } else {
      addToFavorites(product.id);
      setFavorite(true);
    }
    // Dispatch event для обновления профиля
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-placeholder">
            <span>{product.icon || '📦'}</span>
          </div>
        )}
        <button 
          className={`favorite-button ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          {favorite ? '⭐' : '☆'}
        </button>
      </div>
      <div className="product-info">
        <div className="product-company">{product.name}</div>
        {product.discount && (
          <h3 className="product-offer">{product.discount}</h3>
        )}
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </div>
      <button className="product-button">
        Подробнее
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default ProductCard;
