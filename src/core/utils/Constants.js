export const AppConstants = {
  baseUrl: "https://www.fakestore.com",
  login: "https://www.fakestore.com/api/login",
  register: "https://www.fakestore.com/api/register",
  home: "https://www.fakestore.com/api/home?page=1&per_page=10",
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
