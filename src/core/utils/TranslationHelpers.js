import i18next from 'i18next';

/**
 * TranslationHelpers.js
 * Mirrors Flutter's easy_localization extension logic (.tr()).
 */

export const tr = (key, params = {}) => {
  return i18next.t(key, params);
};

/**
 * LocaleKeys helper - mirrors the generated LocaleKeys class in Flutter.
 * Provides a central list of key constants.
 */
export const LocaleKeys = {
  // Common keys likely present in translations
  confirm: 'CONFIRM',
  cancel: 'CANCEL',
  error: 'ERROR',
  success: 'SUCCESS',
  login: 'LOGIN',
  register: 'REGISTER',
  phone: 'PHONE',
  email: 'EMAIL',
  password: 'PASSWORD',
  // ... more keys can be added here or generated from JSON
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { tr, LocaleKeys } from './core/utils/TranslationHelpers';
import { Text } from 'react-native';

const WelcomeText = () => {
  // افترض أن i18next تم إعداده مسبقاً
  return (
    <Text>{tr(LocaleKeys.login)}</Text>
  );
};
*/
