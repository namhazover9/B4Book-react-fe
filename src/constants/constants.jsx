export const languages = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'vi',
    label: 'Vietnamese',
  },
];

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgotPassword',
  ABOUT_US: '/aboutus',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CART: '/cart',
  // SIGNUP: '/signup', // Không có trong routes_here, comment lại
  // PRODUCT: '/product/:productId', // Không có trong routes_here, comment lại
  // NOT_FOUND: '/not-found', // Không có trong routes_here, comment lại
  // SEARCH: '/search', // Không có trong routes_here, comment lại
  // FILTER: '/filter', // Không có trong routes_here, comment lại
  // ACCOUNT: '/account', // Không có trong routes_here, comment lại
  // PAYMENT: '/payment', // Không có trong routes_here, comment lại
};

export default {
  REFRESH_TOKEN_KEY: 'refresh_token',
  ACCESS_TOKEN_KEY: 'access_token',
  CARTS: 'carts',
  DELAY_TIME: 750,
  REFRESH_TOKEN: 'refresh_token',
  MAX_FAILED_LOGIN_TIMES: 5,
  ROUTES,
}

