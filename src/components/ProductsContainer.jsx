import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductsContainer.css';

const mockProducts = [
  {
    id: 1,
    name: 'Яндекс Лавка - сервис доставки продуктов и готовой еды',
    description: 'Быстрая доставка продуктов и готовой еды',
    icon: '🛒',
    discount: 'Скидка 10%',
  },
  {
    id: 2,
    name: 'Оформление карты зарубежного банка в CITORA',
    description: 'Международные банковские услуги',
    icon: '💳',
    discount: 'Бесплатное оформление',
  },
  {
    id: 3,
    name: 'Цветы и подарки от Flowwow',
    description: 'Доставка цветов и подарков',
    icon: '🌹',
    discount: 'Скидка 15%',
  },
  {
    id: 4,
    name: 'Квартиры на специальных условиях: скидки и акции от «Мангазеи»',
    description: 'Выгодные предложения на недвижимость',
    icon: '🏠',
    discount: 'Специальные условия',
  },
  {
    id: 5,
    name: 'Образовательная платформа Нетология',
    description: 'Онлайн-курсы и обучение',
    icon: '📚',
    discount: 'Скидка 20%',
  },
  {
    id: 6,
    name: 'Сервис химчистки Nikko',
    description: 'Химчистка и уборка',
    icon: '🧹',
    discount: 'Скидка 10%',
  },
  {
    id: 7,
    name: 'Свежий кофе Tasty Coffee с бесплатной доставкой',
    description: 'Премиальный кофе с доставкой',
    icon: '☕',
    discount: 'Бесплатная доставка',
  },
  {
    id: 8,
    name: 'Аудиотехника в магазинах Dr.Head',
    description: 'Профессиональная аудиотехника',
    icon: '🎧',
    discount: 'Скидка 15%',
  },
  {
    id: 9,
    name: 'Сервис по заказу лекарств и товаров для красоты Здравсити',
    description: 'Доставка лекарств и косметики',
    icon: '💊',
    discount: 'Скидка 5%',
  },
  {
    id: 10,
    name: 'Химчистка с доставкой и уборка квартир от Airo',
    description: 'Профессиональная уборка',
    icon: '🧽',
    discount: 'Скидка 20%',
  },
  {
    id: 11,
    name: 'Яндекс Маркет',
    description: 'Огромный выбор товаров',
    icon: '🛍️',
    discount: 'Скидка 10%',
  },
  {
    id: 12,
    name: 'Квартиры от VEREN GROUP',
    description: 'Премиальная недвижимость',
    icon: '🏘️',
    discount: 'Специальные условия',
  },
];

const ProductsContainer = ({ searchQuery = '', selectedCategory = null }) => {
  const [products] = useState(mockProducts);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, searchQuery]);

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>
          {searchQuery
            ? `Результаты поиска: "${searchQuery}"`
            : selectedCategory
            ? 'Товары категории'
            : 'Все товары и услуги'}
        </h2>
        <p className="products-count">
          Найдено: {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
        </p>
      </div>
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <p>Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;

