import { useState } from 'react';
import './BecomePartner.css';

const BecomePartner = () => {
  const [selectedTariff, setSelectedTariff] = useState(null);

  const stats = [
    { value: '500K+', label: 'Активных пользователей' },
    { value: '150+', label: 'Партнеров' },
    { value: '1.2M+', label: 'Транзакций в месяц' },
    { value: '95%', label: 'Уровень удовлетворенности' },
  ];

  const tariffs = [
    {
      id: 1,
      name: 'Базовый',
      price: '50 000 ₸',
      period: 'месяц',
      priority: 4,
      features: [
        'Размещение в общем каталоге',
        'Базовая аналитика',
        'Стандартная поддержка',
        'До 1000 показов в месяц',
      ],
      color: '#e0e0e0',
    },
    {
      id: 2,
      name: 'Стандарт',
      price: '120 000 ₸',
      period: 'месяц',
      priority: 3,
      features: [
        'Приоритетное размещение',
        'Расширенная аналитика',
        'Приоритетная поддержка',
        'До 5000 показов в месяц',
        'Выделение цветом',
      ],
      color: '#10b981',
      popular: true,
    },
    {
      id: 3,
      name: 'Премиум',
      price: '250 000 ₸',
      period: 'месяц',
      priority: 2,
      features: [
        'ТОП-3 позиция в каталоге',
        'Полная аналитика с отчетами',
        'Персональный менеджер',
        'До 15000 показов в месяц',
        'Промо на главной странице',
        'Брендирование карточки',
      ],
      color: '#ff9500',
    },
    {
      id: 4,
      name: 'Эксклюзив',
      price: '500 000 ₸',
      period: 'месяц',
      priority: 1,
      features: [
        'ТОП-1 позиция (всегда сверху)',
        'Безлимитные показы',
        'Эксклюзивная поддержка 24/7',
        'Полная аналитика + маркетинг',
        'Баннер на главной',
        'Промо в рассылках',
        'Кастомизация карточки',
        'Приоритет в поиске',
      ],
      color: '#ffd700',
      exclusive: true,
    },
  ];

  const partners = [
    { name: 'Яндекс', logo: '🟡' },
    { name: 'Flowwow', logo: '🌸' },
    { name: 'Нетология', logo: '📚' },
    { name: 'CITORA', logo: '💳' },
    { name: 'Tasty Coffee', logo: '☕' },
    { name: 'Dr.Head', logo: '🎧' },
  ];

  const handleTariffSelect = (tariffId) => {
    setSelectedTariff(tariffId);
    // Здесь можно добавить логику отправки формы
  };

  return (
    <div className="become-partner-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Станьте партнером платформы предложений</h1>
          <p className="hero-subtitle">
            Привлекайте новых клиентов через экосистему онлайн-банка с аудиторией более 500 000 активных пользователей
          </p>
          <button className="cta-button" onClick={() => document.getElementById('tariffs').scrollIntoView({ behavior: 'smooth' })}>
            Выбрать тариф
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Платформа в цифрах</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Почему выбирают нас</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Целевая аудитория</h3>
            <p>Платежеспособные клиенты банка, активно использующие мобильное приложение</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h3>Аналитика</h3>
            <p>Детальная статистика просмотров, переходов и конверсий в реальном времени</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Рост продаж</h3>
            <p>В среднем партнеры получают +40% новых клиентов за первый месяц</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3>Поддержка</h3>
            <p>Персональный менеджер и маркетинговая поддержка для всех партнеров</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="current-partners-section">
        <h2>Наши партнеры</h2>
        <p className="section-subtitle">Присоединяйтесь к лидерам рынка</p>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <span className="partner-emoji">{partner.logo}</span>
              <span className="partner-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tariffs Section */}
      <section className="tariffs-section" id="tariffs">
        <h2>Тарифные планы</h2>
        <p className="section-subtitle">
          Чем выше тариф — тем выше позиция вашей карточки в каталоге
        </p>
        <div className="tariffs-grid">
          {tariffs.map((tariff) => (
            <div 
              key={tariff.id} 
              className={`tariff-card ${tariff.popular ? 'popular' : ''} ${tariff.exclusive ? 'exclusive' : ''} ${selectedTariff === tariff.id ? 'selected' : ''}`}
            >
              {tariff.popular && <div className="badge">Популярный</div>}
              {tariff.exclusive && <div className="badge exclusive-badge">Эксклюзив</div>}
              
              <div className="tariff-header">
                <h3>{tariff.name}</h3>
                <div className="priority-label">Приоритет #{tariff.priority}</div>
              </div>
              
              <div className="tariff-price">
                <span className="price">{tariff.price}</span>
                <span className="period">/ {tariff.period}</span>
              </div>
              
              <ul className="tariff-features">
                {tariff.features.map((feature, index) => (
                  <li key={index}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className="tariff-button"
                onClick={() => handleTariffSelect(tariff.id)}
              >
                {selectedTariff === tariff.id ? 'Выбрано' : 'Выбрать тариф'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Свяжитесь с нами</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>partners@onlinebank.kz</p>
            <a href="mailto:partners@onlinebank.kz" className="contact-link">Написать</a>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <h3>Телефон</h3>
            <p>+7 (727) 123-45-67</p>
            <a href="tel:+77271234567" className="contact-link">Позвонить</a>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>Поддержка</h3>
            <p>Ежедневно с 9:00 до 21:00</p>
            <a href="#" className="contact-link">Чат поддержки</a>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h3>Офис</h3>
            <p>г. Алматы, пр. Аль-Фараби, 77</p>
            <a href="#" className="contact-link">На карте</a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Часто задаваемые вопросы</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>Как быстро начнется размещение?</h3>
            <p>После оплаты и предоставления материалов ваша карточка появится в каталоге в течение 24 часов.</p>
          </div>
          <div className="faq-item">
            <h3>Можно ли изменить тариф?</h3>
            <p>Да, вы можете повысить или понизить тариф в любое время. При повышении разница доплачивается пропорционально.</p>
          </div>
          <div className="faq-item">
            <h3>Какие материалы нужны для размещения?</h3>
            <p>Логотип, описание компании, информация о предложении, промокод (опционально) и контакты.</p>
          </div>
          <div className="faq-item">
            <h3>Есть ли договор?</h3>
            <p>Да, мы заключаем официальный договор оферты. Все работы проводятся с выставлением счетов и актов.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomePartner;

