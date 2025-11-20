import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import './BecomePartner.css';

// Partner logos
import airAstanaLogo from '../assets/Air-Astana-logo.png';
import kazakhtelecomLogo from '../assets/logo_kazahtelekom.png';
import biGroupLogo from '../assets/New_Logo_BI_Group.png';
import pwcLogo from '../assets/PwC_Company_Logo.svg';

const BecomePartner = () => {
  const location = useLocation();
  const [selectedTariff, setSelectedTariff] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    bin: '',
    category: '',
    contactPerson: '',
    phone: '',
    email: '',
    description: '',
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const applicationFormRef = useRef(null);

  // Автоматический скролл к секции при загрузке страницы с hash
  useEffect(() => {
    const scrollToSection = () => {
      const hash = location.hash || window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -80; // Отступ для header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    // Даем время на загрузку контента
    const timer = setTimeout(scrollToSection, 300);
    return () => clearTimeout(timer);
  }, [location]);

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
    { name: 'Казахтелеком', logo: kazakhtelecomLogo },
    { name: 'Air Astana', logo: airAstanaLogo },
    { name: 'BI GROUP', logo: biGroupLogo },
    { name: 'PwC', logo: pwcLogo },
  ];

  const handleTariffSelect = (tariffId) => {
    setSelectedTariff(tariffId);
    // Скролл к форме заявки
    setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.companyName || !formData.bin || !formData.category || !formData.contactPerson || !formData.phone || !formData.email) {
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
      return;
    }

    // Здесь будет отправка на сервер
    console.log('Данные заявки:', {
      ...formData,
      tariffId: selectedTariff,
      logo: logo
    });

    // Сохраняем email перед сбросом формы
    setSubmittedEmail(formData.email);

    // Показываем модальное окно успеха
    setShowSuccessModal(true);
    
    // Сброс формы
    setFormData({
      companyName: '',
      bin: '',
      category: '',
      contactPerson: '',
      phone: '',
      email: '',
      description: '',
    });
    setLogo(null);
    setLogoPreview(null);
    setSelectedTariff(null);

    // Скролл наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedTariffName = () => {
    const tariff = tariffs.find(t => t.id === selectedTariff);
    return tariff ? tariff.name : '';
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="become-partner-page">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseSuccessModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-container">
              <div className="success-checkmark">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            <h2>Ваша заявка отправлена на проверку!</h2>
            <p>Спасибо за интерес к нашей платформе. Наш менеджер свяжется с вами в течение 24 часов для обсуждения деталей сотрудничества.</p>
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-icon">📧</span>
                <span>Проверьте почту {submittedEmail}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📞</span>
                <span>Ожидайте звонка по указанному номеру</span>
              </div>
            </div>
            <button className="success-button" onClick={handleCloseSuccessModal}>
              Понятно
            </button>
          </div>
        </div>
      )}
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
              <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
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

      {/* Application Form Section */}
      <section className="application-form-section" ref={applicationFormRef}>
        <div className="form-container">
          <div className="form-header">
            <h2>Информация о компании</h2>
            <p>Заполните форму, и наш менеджер свяжется с вами для заключения договора</p>
          </div>

            <form onSubmit={handleSubmitApplication} className="application-form">
              {/* Логотип компании */}
              <div className="form-section">
                <h3>Логотип компании</h3>
                <div className="logo-upload-area">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="logo-input"
                  />
                  <label htmlFor="logo-upload" className="logo-upload-label">
                    {logoPreview ? (
                      <div className="logo-preview">
                        <img src={logoPreview} alt="Логотип компании" />
                        <div className="logo-overlay">
                          <span>Изменить логотип</span>
                        </div>
                      </div>
                    ) : (
                      <div className="logo-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>Загрузить логотип</span>
                        <small>PNG, JPG, SVG до 5 МБ</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Информация о компании */}
              <div className="form-section">
                <h3>Информация о компании</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="companyName">
                      Название компании <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="ТОО «Компания»"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bin">
                      ИИН/БИН <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="bin"
                      name="bin"
                      value={formData.bin}
                      onChange={handleInputChange}
                      placeholder="123456789012"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">
                      Категория компании <span className="required">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Контактные данные */}
              <div className="form-section">
                <h3>Контактное лицо</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="contactPerson">
                      ФИО контактного лица <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Иванов Иван Иванович"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Телефон <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@company.kz"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Описание услуги */}
              <div className="form-section">
                <h3>О вашем предложении</h3>
                <div className="form-group">
                  <label htmlFor="description">
                    Краткое описание услуги или товара
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Расскажите о вашем предложении для клиентов банка..."
                    rows="4"
                  />
                </div>
              </div>

              {/* Кнопки */}
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Отправить заявку
                </button>
              </div>
            </form>
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

      {/* Validation Error Alert */}
      {showErrorAlert && (
        <div className="validation-alert">
          <AlertCircle size={20} />
          <span>Пожалуйста, заполните все обязательные поля</span>
        </div>
      )}
    </div>
  );
};

export default BecomePartner;

