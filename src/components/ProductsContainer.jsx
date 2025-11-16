import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductsContainer.css';

const mockProducts = [
  {
    id: 1,
    name: 'Казахтелеком - корпоративная связь и интернет',
    description: 'Высокоскоростной интернет и телефония для бизнеса',
    icon: '📡',
    discount: 'Скидка 15% на годовое обслуживание',
  },
  {
    id: 2,
    name: 'IT-консалтинг от Digital Solutions KZ',
    description: 'Цифровая трансформация и автоматизация бизнеса',
    icon: '💻',
    discount: 'Первая консультация бесплатно',
  },
  {
    id: 3,
    name: 'Коммерческая недвижимость от БАЗИС А',
    description: 'Офисные и торговые помещения в центре Алматы',
    icon: '🏢',
    discount: 'Специальные условия для ТОО',
  },
  {
    id: 4,
    name: 'Ремонт офисов "под ключ" от Stroy Master',
    description: 'Комплексный ремонт коммерческих помещений',
    icon: '🔨',
    discount: 'Скидка 10% на проект',
  },
  {
    id: 5,
    name: 'Дизайн-студия INTERIOR.KZ',
    description: 'Дизайн-проекты офисов и коммерческих пространств',
    icon: '🎨',
    discount: 'Скидка 20% на дизайн-проект',
  },
  {
    id: 6,
    name: 'Платформа онлайн-обучения Skillbox Kazakhstan',
    description: 'Корпоративное обучение сотрудников',
    icon: '📚',
    discount: 'Скидка 25% на корпоративные пакеты',
  },
  {
    id: 7,
    name: 'CleanPro - клининговые услуги для офисов',
    description: 'Уборка и химчистка офисных помещений',
    icon: '🧹',
    discount: 'Скидка 15% при договоре от 6 месяцев',
  },
  {
    id: 8,
    name: 'Корпоративный фитнес - FitLife',
    description: 'Онлайн-тренировки и абонементы для сотрудников',
    icon: '💪',
    discount: 'Скидка 30% на корпоративные абонементы',
  },
  {
    id: 9,
    name: 'Йога-студия Namaste Almaty',
    description: 'Йога и пилатес для снятия стресса сотрудников',
    icon: '🧘',
    discount: 'Скидка 20% на групповые занятия',
  },
  {
    id: 10,
    name: 'Asana Productivity - повышение эффективности',
    description: 'Инструменты управления проектами и продуктивности',
    icon: '📊',
    discount: 'Скидка 25% на годовую подписку',
  },
  {
    id: 11,
    name: '1C:Бухгалтерия для Казахстана',
    description: 'Автоматизация бухгалтерского и налогового учета',
    icon: '💼',
    discount: 'Скидка 15% на внедрение',
  },
  {
    id: 12,
    name: 'Правовая поддержка от AEQUITAS Law Firm',
    description: 'Юридическое сопровождение бизнеса',
    icon: '⚖️',
    discount: 'Первая консультация бесплатно',
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

