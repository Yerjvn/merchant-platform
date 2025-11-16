import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import onlineBankLogo from '../assets/online-bank-logo.svg';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    // Если мы не на главной, переходим на главную с поиском
    if (location.pathname !== '/') {
      navigate('/', { state: { searchQuery } });
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={onlineBankLogo} alt="Online Bank" className="logo-svg" />
        </div>
        
        <div className="location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Алматы</span>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Поиск товаров и услуг..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
        <div className="header-actions">
          <button 
            className="partner-button" 
            onClick={() => navigate('/become-partner')}
          >
            Стать партнером
          </button>
          <button 
            className="profile-button"
            onClick={() => navigate('/profile')}
          >
            Профиль
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
