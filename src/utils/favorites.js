// Утилиты для работы с избранным

export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (productId) => {
  const favorites = getFavorites();
  if (!favorites.includes(productId)) {
    favorites.push(productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFromFavorites = (productId) => {
  const favorites = getFavorites();
  const filtered = favorites.filter(id => id !== productId);
  localStorage.setItem('favorites', JSON.stringify(filtered));
  return filtered;
};

export const isFavorite = (productId) => {
  const favorites = getFavorites();
  return favorites.includes(productId);
};

