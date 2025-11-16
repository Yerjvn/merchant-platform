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
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        {product.discount && (
          <div className="product-discount">{product.discount}</div>
        )}
      </div>
      <button className="product-button">Подробнее</button>
    </div>
  );
};

export default ProductCard;
