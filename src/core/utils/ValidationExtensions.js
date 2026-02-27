import i18next from 'i18next';

/**
 * ValidationExtensions.js
 * Mirrors Flutter's field_extensions.dart.
 */

export const validatePhone = (value) => {
  const regex = /^(00966|966|\+966|0)?5\d{8}$/;
  if (!value || value.trim() === '') {
    return i18next.t('the field is required');
  } else if (!regex.test(value)) {
    return i18next.t('invalid phone number');
  }
  return null;
};

export const validateEmail = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!value || value.trim() === '') {
    return i18next.t('the field is required');
  } else if (!regex.test(value)) {
    return i18next.t('email is not valid');
  }
  return null;
};

export const validatePassword = (value, confirmPassword) => {
  if (!value || value.trim() === '') {
    return i18next.t('the field is required');
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
    return i18next.t('the password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number');
  } else if (value.includes(' ')) {
    return i18next.t('the password must not contain spaces');
  } else if (value.length > 20) {
    return i18next.t('the password must not exceed 20 characters');
  } else if (value.length < 8) {
    return i18next.t('the password must be at least 8 characters');
  } else if (value !== confirmPassword) {
    return i18next.t('passwords do not match');
  }
  return null;
};

export const FieldConstants = {
  phone: 'Phone',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'ConfirmPassword',
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { validatePhone, validateEmail } from './core/utils/ValidationExtensions';

const checkInput = () => {
  const emailError = validateEmail('test@test.com');
  if (emailError) {
    console.log('خطأ في البريد:', emailError);
  }
};
*/
