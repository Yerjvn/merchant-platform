// Утилита для управления ролью пользователя

const USER_ROLE_KEY = 'userRole';

// Роли пользователей
export const USER_ROLES = {
  CLIENT: 'client',     // Обычный клиент
  PARTNER: 'partner'    // Партнер
};

// Получить роль пользователя
export const getUserRole = () => {
  const role = localStorage.getItem(USER_ROLE_KEY);
  return role || USER_ROLES.CLIENT; // По умолчанию - клиент
};

// Установить роль пользователя
export const setUserRole = (role) => {
  if (Object.values(USER_ROLES).includes(role)) {
    localStorage.setItem(USER_ROLE_KEY, role);
    // Отправляем событие для обновления компонентов
    window.dispatchEvent(new Event('userRoleChanged'));
    return true;
  }
  return false;
};

// Проверить, является ли пользователь партнером
export const isPartner = () => {
  return getUserRole() === USER_ROLES.PARTNER;
};

// Проверить, является ли пользователь клиентом
export const isClient = () => {
  return getUserRole() === USER_ROLES.CLIENT;
};

// Переключить роль (для тестирования)
export const toggleUserRole = () => {
  const currentRole = getUserRole();
  const newRole = currentRole === USER_ROLES.CLIENT ? USER_ROLES.PARTNER : USER_ROLES.CLIENT;
  setUserRole(newRole);
  return newRole;
};

