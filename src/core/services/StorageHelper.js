import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * StorageHelper.js
 * Mirrors Flutter's SharedPrefHelper.
 */
class StorageHelper {
  static instance = new StorageHelper();

  async getCustomer() {
    const userJson = await AsyncStorage.getItem('customer');
    if (!userJson) return null;
    return JSON.parse(userJson);
  }

  async setCustomer(customer) {
    const userJson = JSON.stringify(customer);
    await AsyncStorage.setItem('customer', userJson);
  }

  async removeCustomer() {
    await AsyncStorage.removeItem('customer');
  }

  async clear() {
    await AsyncStorage.clear();
  }

  async removeToken() {
    await AsyncStorage.removeItem('auth_token');
  }

  async getToken() {
    return (await AsyncStorage.getItem('auth_token')) || '';
  }

  async setToken(token) {
    await AsyncStorage.setItem('auth_token', token);
  }

  async getSearchTerms() {
    const termsJson = await AsyncStorage.getItem('search_terms');
    return termsJson ? JSON.parse(termsJson) : [];
  }

  async addSearchTerm(term) {
    let terms = await this.getSearchTerms();
    if (!terms.includes(term)) {
      terms.unshift(term);
      if (terms.length > 10) {
        terms = terms.slice(0, 10);
      }
      await AsyncStorage.setItem('search_terms', JSON.stringify(terms));
    }
  }
}

export default StorageHelper.instance;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import StorageHelper from './core/services/StorageHelper';

const setLocalData = async () => {
  await StorageHelper.set('key', 'value');
  const val = await StorageHelper.get('key');
  console.log(val);
};
*/
