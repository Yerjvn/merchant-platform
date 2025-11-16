import { useState } from 'react';
import CategorySlider from '../components/CategorySlider';
import ProductsContainer from '../components/ProductsContainer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  return (
    <>
      <CategorySlider onCategorySelect={handleCategorySelect} />
      <ProductsContainer 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory} 
      />
    </>
  );
};

export default Home;

