/**
 * AppConstants.js
 * Mirrors Flutter's AppConstants class.
 */
export const AppConstants = {
  baseUrl: 'https://www.fakestore.com',
  apiUrl: 'https://www.fakestore.com/api',
  
  // Endpoints
  login: '/api/login',
  register: '/api/register',
  home: '/api/home?page=1&per_page=10',
  graphql: '/graphql',
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AppConstants } from './core/constants/AppConstants';

const getApiUrl = () => {
  return `${AppConstants.baseUrl}${AppConstants.home}`;
};
*/
