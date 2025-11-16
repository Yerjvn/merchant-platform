import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CategorySlider.css';

const categories = [
  { id: 1, name: 'Новинки', icon: '🆕' },
  { id: 2, name: 'Техника и Электроника', icon: '📱' },
  { id: 3, name: 'Товары', icon: '🛍️' },
  { id: 4, name: 'Рестораны и доставка', icon: '🍔' },
  { id: 5, name: 'Обучение', icon: '📚' },
  { id: 6, name: 'Отдых', icon: '🏖️' },
  { id: 7, name: 'Спорт', icon: '⚽' },
  { id: 8, name: 'Красота и Здоровье', icon: '💄' },
  { id: 9, name: 'Дети', icon: '👶' },
  { id: 10, name: 'Развлечения', icon: '🎬' },
  { id: 11, name: 'Услуги', icon: '🔧' },
  { id: 12, name: 'Premium', icon: '⭐' },
];

const CategorySlider = ({ onCategorySelect }) => {
  return (
    <div className="category-slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
        }}
        className="category-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div
              className="category-card"
              onClick={() => onCategorySelect && onCategorySelect(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;

