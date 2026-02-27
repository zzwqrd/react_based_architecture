/**
 * FieldExtensions mirrors field_extensions.dart from Flutter.
 * Provides validation functions for form fields.
 */

// Basic translations (you can connect these to your i18n solution if needed)
const translations = {
  required: "هذا الحقل مطلوب",
  invalid_phone: "رقم الهاتف غير صالح",
  invalid_email: "البريد الإلكتروني غير صالح",
  password_complexity: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، حرف كبير، حرف صغير، ورقم",
  password_no_spaces: "يجب ألا تحتوي كلمة المرور على مسافات",
  password_max_length: "يجب ألا تتجاوز كلمة المرور 20 حرفاً",
  password_min_length: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
  password_mismatch: "كلمات المرور غير متطابقة",
};

export const validatePhone = (value) => {
  const regex = /^(00966|966|\+966|0)?5\d{8}$/;
  if (!value || value.trim() === "") {
    return translations.required;
  } else if (!regex.test(value)) {
    return translations.invalid_phone;
  }
  return null;
};

export const validateEmail = (value) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!value || value.trim() === "") {
    return translations.required;
  } else if (!regex.test(value)) {
    return translations.invalid_email;
  }
  return null;
};

export const validatePassword = (value, confirmPassword = null) => {
  if (!value || value.trim() === "") {
    return translations.required;
  }
  
  if (value.includes(" ")) {
    return translations.password_no_spaces;
  }

  if (value.length < 8) {
    return translations.password_min_length;
  }

  if (value.length > 20) {
    return translations.password_max_length;
  }

  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!complexityRegex.test(value)) {
    return translations.password_complexity;
  }

  if (confirmPassword !== null && value !== confirmPassword) {
    return translations.password_mismatch;
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
import { validatePhone, validateEmail, validatePassword } from './core/utils/FieldExtensions';

const checkInput = () => {
  const emailError = validateEmail('test@test.com');
  if (emailError) {
    console.log('خطأ في البريد:', emailError);
  }

  const passError = validatePassword('Pass1234', 'Pass1234');
  if (!passError) {
    console.log('كلمة المرور صحيحة ومتطابقة');
  }
};
*/
