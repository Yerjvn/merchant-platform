import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './CategorySlider.css';
import sportImage from '../assets/sport.png';
import otdyhImage from '../assets/otdyh.png';
import obuchenieImage from '../assets/obuchenie.png';
import tehnikaImage from '../assets/tehnika.png';
import novinkiImage from '../assets/novinki.png';
import tovaryImage from '../assets/tovary.png';
import uslugiImage from '../assets/uslugi.png';

const categories = [
  { id: 1, name: 'Спорт', image: sportImage },
  { id: 2, name: 'Отдых', image: otdyhImage },
  { id: 3, name: 'Обучение', image: obuchenieImage },
  { id: 4, name: 'Техника', image: tehnikaImage },
  { id: 5, name: 'Новинки', image: novinkiImage },
  { id: 6, name: 'Товары', image: tovaryImage },
  { id: 7, name: 'Услуги', image: uslugiImage },
];

const CategorySlider = ({ onCategorySelect }) => {
  return (
    <div className="category-slider-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={2}
        navigation
        loop={true}
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
            <div className="category-card">
              <div 
                className="category-icon"
                onClick={() => onCategorySelect && onCategorySelect(category.id)}
              >
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-name">{category.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;

