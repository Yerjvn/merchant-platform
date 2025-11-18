import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductsContainer.css';
import kazakhtelecomBanner from '../assets/Kazakhtelecom Banner 800x450.webp';
import biGroupImage from '../assets/bi-group.jpg';
import itConsultingImage from '../assets/it-consulting.png';
import remontImage from '../assets/remont.jpg';
import designStudioImage from '../assets/design-studio.png';
import skillboxImage from '../assets/skillbox.png';
import cleaningImage from '../assets/cleaning.jpg';
import fitnessImage from '../assets/fitnes.jpg';
import yogaImage from '../assets/йога.jpg';
import asanaImage from '../assets/Asana Productivity.png';
import buhgalterImage from '../assets/бухгалтер.png';
import yuristImage from '../assets/юрист.jpeg';

const mockProducts = [
  {
    id: 1,
    name: 'Казахтелеком - корпоративная связь и интернет',
    description: 'Высокоскоростной интернет и телефония для бизнеса',
    icon: '📡',
    image: kazakhtelecomBanner,
    discount: 'Скидка 15% на годовое обслуживание',
  },
  {
    id: 2,
    name: 'IT-консалтинг от Digital Solutions KZ',
    description: 'Цифровая трансформация и автоматизация бизнеса',
    icon: '💻',
    image: itConsultingImage,
    discount: 'Первая консультация бесплатно',
  },
  {
    id: 3,
    name: 'Коммерческая недвижимость от BI GROUP',
    description: 'Офисные и торговые помещения в центре Алматы',
    icon: '🏢',
    image: biGroupImage,
    discount: 'Специальные условия для ТОО',
  },
  {
    id: 4,
    name: 'Ремонт офисов "под ключ" от Stroy Master',
    description: 'Комплексный ремонт коммерческих помещений',
    icon: '🔨',
    image: remontImage,
    discount: 'Скидка 10% на проект',
  },
  {
    id: 5,
    name: 'Дизайн-студия INTERIOR.KZ',
    description: 'Дизайн-проекты офисов и коммерческих пространств',
    icon: '🎨',
    image: designStudioImage,
    discount: 'Скидка 20% на дизайн-проект',
  },
  {
    id: 6,
    name: 'Платформа онлайн-обучения Skillbox Kazakhstan',
    description: 'Корпоративное обучение сотрудников',
    icon: '📚',
    image: skillboxImage,
    discount: 'Скидка 25% на корпоративные пакеты',
  },
  {
    id: 7,
    name: 'CleanPro - клининговые услуги для офисов',
    description: 'Уборка и химчистка офисных помещений',
    icon: '🧹',
    image: cleaningImage,
    discount: 'Скидка 15% при договоре от 6 месяцев',
  },
  {
    id: 8,
    name: 'Корпоративный фитнес - FitLife',
    description: 'Онлайн-тренировки и абонементы для сотрудников',
    icon: '💪',
    image: fitnessImage,
    discount: 'Скидка 30% на корпоративные абонементы',
  },
  {
    id: 9,
    name: 'Йога-студия Namaste Almaty',
    description: 'Йога и пилатес для снятия стресса сотрудников',
    icon: '🧘',
    image: yogaImage,
    discount: 'Скидка 20% на групповые занятия',
  },
  {
    id: 10,
    name: 'Asana Productivity - повышение эффективности',
    description: 'Инструменты управления проектами и продуктивности',
    icon: '📊',
    image: asanaImage,
    discount: 'Скидка 25% на годовую подписку',
  },
  {
    id: 11,
    name: '1C:Бухгалтерия для Казахстана',
    description: 'Автоматизация бухгалтерского и налогового учета',
    icon: '💼',
    image: buhgalterImage,
    discount: 'Скидка 15% на внедрение',
  },
  {
    id: 12,
    name: 'Правовая поддержка от AEQUITAS Law Firm',
    description: 'Юридическое сопровождение бизнеса',
    icon: '⚖️',
    image: yuristImage,
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

