/**
 * MethodsHelpers.js
 * Mirrors Flutter's MethodsHelpers class.
 */
export const MethodsHelpers = {
  formatPhoneNumber: (phoneNumber) => {
    if (!phoneNumber) return '';
    let formattedNumber = phoneNumber.replace(/^0/, '');
    if (!formattedNumber.startsWith('0')) {
      formattedNumber = `0${formattedNumber}`;
    }
    return formattedNumber;
  },
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { MethodsHelpers } from './core/utils/MethodsHelpers';

const formatNumber = () => {
  const number = "512345678";
  const formatted = MethodsHelpers.formatPhoneNumber(number); 
  console.log(formatted); // سيعطي "0512345678"
};
*/
