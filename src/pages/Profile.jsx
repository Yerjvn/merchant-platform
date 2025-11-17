import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites } from '../utils/favorites';
import { isPartner, toggleUserRole } from '../utils/userRole';
import './Profile.css';
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

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(isPartner() ? 'overview' : 'favorites');
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [userIsPartner, setUserIsPartner] = useState(isPartner());

  // Загрузка избранного при монтировании
  useEffect(() => {
    setFavoriteIds(getFavorites());
    setUserIsPartner(isPartner());
    
    // Слушаем обновления избранного
    const handleFavoritesUpdate = () => {
      setFavoriteIds(getFavorites());
    };

    // Слушаем изменения роли пользователя
    const handleRoleChange = () => {
      const newIsPartner = isPartner();
      setUserIsPartner(newIsPartner);
      // Переключаем активную вкладку в зависимости от роли
      setActiveTab(newIsPartner ? 'overview' : 'favorites');
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    window.addEventListener('userRoleChanged', handleRoleChange);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
      window.removeEventListener('userRoleChanged', handleRoleChange);
    };
  }, []);

  // Мок-данные всех продуктов (для избранного)
  const mockProducts = [
    { id: 1, name: 'Казахтелеком - корпоративная связь и интернет', description: 'Высокоскоростной интернет и телефония для бизнеса', icon: '📡', image: kazakhtelecomBanner, discount: 'Скидка 15% на годовое обслуживание' },
    { id: 2, name: 'IT-консалтинг от Digital Solutions KZ', description: 'Цифровая трансформация и автоматизация бизнеса', icon: '💻', image: itConsultingImage, discount: 'Первая консультация бесплатно' },
    { id: 3, name: 'Коммерческая недвижимость от BI GROUP', description: 'Офисные и торговые помещения в центре Алматы', icon: '🏢', image: biGroupImage, discount: 'Специальные условия для ТОО' },
    { id: 4, name: 'Ремонт офисов "под ключ" от Stroy Master', description: 'Комплексный ремонт коммерческих помещений', icon: '🔨', image: remontImage, discount: 'Скидка 10% на проект' },
    { id: 5, name: 'Дизайн-студия INTERIOR.KZ', description: 'Дизайн-проекты офисов и коммерческих пространств', icon: '🎨', image: designStudioImage, discount: 'Скидка 20% на дизайн-проект' },
    { id: 6, name: 'Платформа онлайн-обучения Skillbox Kazakhstan', description: 'Корпоративное обучение сотрудников', icon: '📚', image: skillboxImage, discount: 'Скидка 25% на корпоративные пакеты' },
    { id: 7, name: 'CleanPro - клининговые услуги для офисов', description: 'Уборка и химчистка офисных помещений', icon: '🧹', image: cleaningImage, discount: 'Скидка 15% при договоре от 6 месяцев' },
    { id: 8, name: 'Корпоративный фитнес - FitLife', description: 'Онлайн-тренировки и абонементы для сотрудников', icon: '💪', image: fitnessImage, discount: 'Скидка 30% на корпоративные абонементы' },
    { id: 9, name: 'Йога-студия Namaste Almaty', description: 'Йога и пилатес для снятия стресса сотрудников', icon: '🧘', image: yogaImage, discount: 'Скидка 20% на групповые занятия' },
    { id: 10, name: 'Asana Productivity - повышение эффективности', description: 'Инструменты управления проектами и продуктивности', icon: '📊', image: asanaImage, discount: 'Скидка 25% на годовую подписку' },
    { id: 11, name: '1C:Бухгалтерия для Казахстана', description: 'Автоматизация бухгалтерского и налогового учета', icon: '💼', image: buhgalterImage, discount: 'Скидка 15% на внедрение' },
    { id: 12, name: 'Правовая поддержка от AEQUITAS Law Firm', description: 'Юридическое сопровождение бизнеса', icon: '⚖️', image: yuristImage, discount: 'Первая консультация бесплатно' },
  ];

  const favoriteProducts = mockProducts.filter(product => favoriteIds.includes(product.id));

  // Мок-данные партнера
  const partnerInfo = {
    id: 1,
    name: 'Казахтелеком',
    email: 'corporate@telecom.kz',
    phone: '+7 (727) 258-00-00',
    address: 'г. Алматы, пр. Абая, 109А',
    registrationDate: '15.03.2024',
    status: 'Активный',
    manager: {
      name: 'Айгерим Серикова',
      phone: '+7 (777) 999-88-77',
      email: 'a.serikova@onlinebank.kz',
    },
  };

  // Мок-данные тарифа
  const currentTariff = {
    name: 'Стандарт',
    price: '120 000 ₸',
    period: 'месяц',
    priority: 3,
    startDate: '01.11.2024',
    endDate: '01.12.2024',
    autoRenewal: true,
  };

  // Мок-данные аналитики
  const analytics = {
    totalViews: 12540,
    totalClicks: 3210,
    conversions: 856,
    viewsChange: '+15%',
    clicksChange: '+22%',
    conversionsChange: '+18%',
  };

  // Мок-данные карточек
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Корпоративный интернет от Казахтелеком',
      description: 'Высокоскоростной интернет до 1 Гбит/с для офисов',
      icon: '📡',
      image: null,
      discount: 'Скидка 15% на год',
      promoCode: 'TELECOM2025',
      views: 8450,
      clicks: 2100,
      conversions: 580,
      status: 'Активна',
      createdAt: '15.03.2024',
    },
    {
      id: 2,
      name: 'IP-телефония для бизнеса',
      description: 'Корпоративная телефония с интеграцией в CRM',
      icon: '☎️',
      image: null,
      discount: 'Первый месяц бесплатно',
      promoCode: 'IPPHONE2025',
      views: 4090,
      clicks: 1110,
      conversions: 276,
      status: 'Активна',
      createdAt: '20.09.2024',
    },
  ]);

  const [newCard, setNewCard] = useState({
    name: '',
    description: '',
    category: '',
    discount: '',
    promoCode: '',
    image: null,
    icon: '📦',
  });

  // Категории компаний
  const categories = [
    'Автосфера',
    'IT и технологии',
    'Техника и электроника',
    'Недвижимость',
    'Строительство и ремонт',
    'Образование',
    'Финансы и банки',
    'Медицина и здоровье',
    'Спорт и фитнес',
    'Красота и уход',
    'Туризм и отдых',
    'Ресторан и кафе',
    'Доставка и логистика',
    'Юридические услуги',
    'Консалтинг',
    'Телекоммуникации',
    'Другое'
  ];

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit && editingCard) {
          setEditingCard({ ...editingCard, image: reader.result });
        } else {
          setNewCard({ ...newCard, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCard = () => {
    if (newCard.name && newCard.description) {
      const card = {
        id: cards.length + 1,
        ...newCard,
        views: 0,
        clicks: 0,
        conversions: 0,
        status: 'Активна',
        createdAt: new Date().toLocaleDateString('ru-RU'),
      };
      setCards([...cards, card]);
      setNewCard({ name: '', description: '', category: '', discount: '', promoCode: '', image: null, icon: '📦' });
      setShowAddCard(false);
      alert('Карточка успешно добавлена!');
    } else {
      alert('Заполните обязательные поля');
    }
  };

  const handleUpdateCard = () => {
    if (editingCard) {
      setCards(cards.map(card => card.id === editingCard.id ? editingCard : card));
      setEditingCard(null);
      alert('Карточка успешно обновлена!');
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-placeholder">{userIsPartner ? partnerInfo.name[0] : 'К'}</div>
          </div>
          <h2 className="partner-name">{userIsPartner ? partnerInfo.name : 'Клиент'}</h2>
          <p className="partner-status">{userIsPartner ? partnerInfo.status : 'Активный клиент'}</p>

          <nav className="profile-nav">
            {/* Вкладки только для партнеров */}
            {userIsPartner && (
              <>
                <button
                  className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  📊 Обзор
                </button>
                <button
                  className={`nav-item ${activeTab === 'cards' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cards')}
                >
                  🎴 Мои карточки
                </button>
              </>
            )}
            
            {/* Избранное для всех */}
            <button
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              ⭐ Избранное ({favoriteIds.length})
            </button>
            
            {/* Вкладки только для партнеров */}
            {userIsPartner && (
              <>
                <button
                  className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  📈 Аналитика
                </button>
                <button
                  className={`nav-item ${activeTab === 'tariff' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tariff')}
                >
                  💳 Мой тариф
                </button>
              </>
            )}
            
            {/* Настройки для всех */}
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Настройки
            </button>
          </nav>

          {/* Кнопка для переключения роли (для тестирования) */}
          <button 
            className="toggle-role-button" 
            onClick={() => toggleUserRole()}
          >
            {userIsPartner ? '👤 Режим клиента' : '🏢 Режим партнера'}
          </button>

          <button className="logout-button" onClick={() => navigate('/')}>
            Выйти
          </button>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {/* Overview Tab - только для партнеров */}
          {userIsPartner && activeTab === 'overview' && (
            <div className="tab-content">
              <h1>Обзор</h1>

              <div className="stats-cards">
                <div className="stat-card-small">
                  <div className="stat-icon">👁️</div>
                  <div className="stat-info">
                    <div className="stat-value">{analytics.totalViews.toLocaleString()}</div>
                    <div className="stat-label">Просмотры</div>
                    <div className="stat-change positive">{analytics.viewsChange}</div>
                  </div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-icon">👆</div>
                  <div className="stat-info">
                    <div className="stat-value">{analytics.totalClicks.toLocaleString()}</div>
                    <div className="stat-label">Клики</div>
                    <div className="stat-change positive">{analytics.clicksChange}</div>
                  </div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <div className="stat-value">{analytics.conversions.toLocaleString()}</div>
                    <div className="stat-label">Конверсии</div>
                    <div className="stat-change positive">{analytics.conversionsChange}</div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>Информация о партнере</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{partnerInfo.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Телефон:</span>
                    <span className="info-value">{partnerInfo.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Адрес:</span>
                    <span className="info-value">{partnerInfo.address}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Дата регистрации:</span>
                    <span className="info-value">{partnerInfo.registrationDate}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h2>Личный менеджер</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Имя:</span>
                    <span className="info-value">{partnerInfo.manager.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Телефон:</span>
                    <span className="info-value">
                      <a href={`tel:${partnerInfo.manager.phone}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                        {partnerInfo.manager.phone}
                      </a>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      <a href={`mailto:${partnerInfo.manager.email}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                        {partnerInfo.manager.email}
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              <div className="quick-tariff">
                <h3>Текущий тариф: {currentTariff.name}</h3>
                <p>Приоритет #{currentTariff.priority} • {currentTariff.price}/{currentTariff.period}</p>
                <button onClick={() => setActiveTab('tariff')} className="view-tariff-btn">
                  Подробнее
                </button>
              </div>
            </div>
          )}

          {/* Cards Tab - только для партнеров */}
          {userIsPartner && activeTab === 'cards' && (
            <div className="tab-content">
              <div className="tab-header">
                <h1>Мои карточки ({cards.length})</h1>
                <button className="add-card-btn" onClick={() => setShowAddCard(true)}>
                  + Добавить карточку
                </button>
              </div>

              <div className="cards-list">
                {cards.map(card => (
                  <div key={card.id} className="card-item">
                    <div className="card-preview">
                      {card.image ? (
                        <img src={card.image} alt={card.name} />
                      ) : (
                        <div className="card-icon">{card.icon}</div>
                      )}
                    </div>
                    <div className="card-details">
                      <h3>{card.name}</h3>
                      <p>{card.description}</p>
                      <div className="card-meta">
                        <span className="card-discount">{card.discount}</span>
                        <span className="card-promo">Промокод: {card.promoCode}</span>
                      </div>
                      <div className="card-stats-mini">
                        <span>👁️ {card.views}</span>
                        <span>👆 {card.clicks}</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => setEditingCard(card)}>
                        ✏️ Редактировать
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>
                        🗑️ Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Card Modal */}
              {showAddCard && (
                <div className="modal-overlay" onClick={() => setShowAddCard(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Добавить новую карточку</h2>
                    <form className="card-form" onSubmit={(e) => { e.preventDefault(); handleAddCard(); }}>
                      <div className="form-group">
                        <label>Название *</label>
                        <input
                          type="text"
                          value={newCard.name}
                          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                          placeholder="Название услуги"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Категория *</label>
                        <select
                          value={newCard.category}
                          onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                          required
                        >
                          <option value="">Выберите категорию</option>
                          {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Описание *</label>
                        <textarea
                          value={newCard.description}
                          onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                          placeholder="Краткое описание"
                          rows="3"
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Скидка</label>
                          <input
                            type="text"
                            value={newCard.discount}
                            onChange={(e) => setNewCard({ ...newCard, discount: e.target.value })}
                            placeholder="Например: Скидка 10%"
                          />
                        </div>
                        <div className="form-group">
                          <label>Промокод</label>
                          <input
                            type="text"
                            value={newCard.promoCode}
                            onChange={(e) => setNewCard({ ...newCard, promoCode: e.target.value })}
                            placeholder="PROMO2024"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Изображение</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                        />
                        {newCard.image && (
                          <div className="image-preview">
                            <img src={newCard.image} alt="Preview" />
                          </div>
                        )}
                      </div>
                      <div className="form-actions">
                        <button type="button" onClick={() => setShowAddCard(false)} className="cancel-btn">
                          Отмена
                        </button>
                        <button type="submit" className="submit-btn">
                          Добавить
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Card Modal */}
              {editingCard && (
                <div className="modal-overlay" onClick={() => setEditingCard(null)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Редактировать карточку</h2>
                    <form className="card-form" onSubmit={(e) => { e.preventDefault(); handleUpdateCard(); }}>
                      <div className="form-group">
                        <label>Название *</label>
                        <input
                          type="text"
                          value={editingCard.name}
                          onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Описание *</label>
                        <textarea
                          value={editingCard.description}
                          onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                          rows="3"
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Скидка</label>
                          <input
                            type="text"
                            value={editingCard.discount}
                            onChange={(e) => setEditingCard({ ...editingCard, discount: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Промокод</label>
                          <input
                            type="text"
                            value={editingCard.promoCode}
                            onChange={(e) => setEditingCard({ ...editingCard, promoCode: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Изображение</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                        />
                        {editingCard.image && (
                          <div className="image-preview">
                            <img src={editingCard.image} alt="Preview" />
                          </div>
                        )}
                      </div>
                      <div className="form-actions">
                        <button type="button" onClick={() => setEditingCard(null)} className="cancel-btn">
                          Отмена
                        </button>
                        <button type="submit" className="submit-btn">
                          Сохранить
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="tab-content">
              <h1>Избранное ({favoriteIds.length})</h1>
              
              {favoriteProducts.length > 0 ? (
                <div className="favorites-grid">
                  {favoriteProducts.map(product => (
                    <div key={product.id} className="favorite-product-card" onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="favorite-product-image">
                        {product.image ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          <div className="favorite-product-icon">{product.icon || '📦'}</div>
                        )}
                      </div>
                      <div className="favorite-product-info">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        {product.discount && (
                          <div className="favorite-product-discount">{product.discount}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-favorites">
                  <div className="no-favorites-icon">⭐</div>
                  <h2>У вас пока нет избранных предложений</h2>
                  <p>Нажмите на звездочку на карточке товара, чтобы добавить его в избранное</p>
                  <button onClick={() => navigate('/')} className="browse-button">
                    Посмотреть предложения
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab - только для партнеров */}
          {userIsPartner && activeTab === 'analytics' && (
            <div className="tab-content">
              <h1>Аналитика</h1>
              <div className="analytics-section">
                <h2>Статистика использования услуг</h2>
                <div className="analytics-cards">
                  {cards.map(card => (
                    <div key={card.id} className="analytics-card">
                      <h3>{card.name}</h3>
                      <div className="analytics-stats">
                        <div className="analytics-item">
                          <span className="analytics-label">Просмотры:</span>
                          <span className="analytics-value">{card.views.toLocaleString()}</span>
                        </div>
                        <div className="analytics-item">
                          <span className="analytics-label">Клики:</span>
                          <span className="analytics-value">{card.clicks.toLocaleString()}</span>
                        </div>
                        <div className="analytics-item">
                          <span className="analytics-label">CTR:</span>
                          <span className="analytics-value">{((card.clicks / card.views) * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tariff Tab - только для партнеров */}
          {userIsPartner && activeTab === 'tariff' && (
            <div className="tab-content">
              <h1>Мой тариф</h1>
              <div className="current-tariff-info">
                <div className="tariff-card-large">
                  <h2>{currentTariff.name}</h2>
                  <div className="tariff-price-large">{currentTariff.price}/{currentTariff.period}</div>
                  <div className="tariff-details">
                    <div className="tariff-detail">
                      <span>Приоритет:</span>
                      <span>#{currentTariff.priority}</span>
                    </div>
                    <div className="tariff-detail">
                      <span>Дата начала:</span>
                      <span>{currentTariff.startDate}</span>
                    </div>
                    <div className="tariff-detail">
                      <span>Дата окончания:</span>
                      <span>{currentTariff.endDate}</span>
                    </div>
                    <div className="tariff-detail">
                      <span>Автопродление:</span>
                      <span>{currentTariff.autoRenewal ? 'Включено' : 'Выключено'}</span>
                    </div>
                  </div>
                  <button className="upgrade-btn" onClick={() => navigate('/become-partner')}>
                    Изменить тариф
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h1>Настройки</h1>
              <div className="settings-section">
                <h2>Информация о компании</h2>
                <form className="settings-form">
                  <div className="form-group">
                    <label>Название компании</label>
                    <input type="text" defaultValue={partnerInfo.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={partnerInfo.email} />
                  </div>
                  <div className="form-group">
                    <label>Телефон</label>
                    <input type="tel" defaultValue={partnerInfo.phone} />
                  </div>
                  <div className="form-group">
                    <label>Адрес</label>
                    <input type="text" defaultValue={partnerInfo.address} />
                  </div>
                  <button type="submit" className="save-btn">Сохранить изменения</button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

