export const AppConstants = {
  baseUrl: 'https://m2.alothemes.com/orfarm/english_2',
  login: 'https://m2.alothemes.com/orfarm/english_2/api/login',
  register: 'https://m2.alothemes.com/orfarm/english_2/api/register',
  home: 'https://m2.alothemes.com/orfarm/english_2/api/home?page=1&per_page=10',
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AppConstants } from './core/utils/Constants';

const fetchHomeData = async () => {
  const response = await fetch(AppConstants.home);
  const data = await response.json();
  console.log(data);
};
*/
