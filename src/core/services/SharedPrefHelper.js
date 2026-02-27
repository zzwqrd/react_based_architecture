import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * SharedPrefHelper.js
 * Mirrors Flutter's SharedPrefHelper (shared_pref_helper.dart).
 * Uses AsyncStorage for data persistence.
 */
class SharedPrefHelper {
  static async getCustomer() {
    try {
      const userJson = await AsyncStorage.getItem('customer');
      if (userJson == null) return {};
      return JSON.parse(userJson);
    } catch (e) {
      console.error('SharedPrefHelper error [getCustomer]:', e);
      return {};
    }
  }

  static async setCustomer(customer) {
    try {
      await AsyncStorage.setItem('customer', JSON.stringify(customer));
    } catch (e) {
      console.error('SharedPrefHelper error [setCustomer]:', e);
    }
  }

  static async removeCustomer() {
    await AsyncStorage.removeItem('customer');
  }

  static async clear() {
    await AsyncStorage.clear();
  }

  static async removeToken() {
    await AsyncStorage.removeItem('auth_token');
  }

  static async getToken() {
    return (await AsyncStorage.getItem('auth_token')) || '';
  }

  static async setToken(token) {
    await AsyncStorage.setItem('auth_token', token);
  }

  static async getSearchTerms() {
    try {
      const termsJson = await AsyncStorage.getItem('search_terms');
      return termsJson ? JSON.parse(termsJson) : [];
    } catch (e) {
      return [];
    }
  }

  static async addSearchTerm(term) {
    try {
      let terms = await this.getSearchTerms();
      if (!terms.includes(term)) {
        terms.unshift(term);
        if (terms.length > 10) {
          terms = terms.slice(0, 10);
        }
        await AsyncStorage.setItem('search_terms', JSON.stringify(terms));
      }
    } catch (e) {
      console.error('SharedPrefHelper error [addSearchTerm]:', e);
    }
  }

  static async getRecentlyViewed() {
    try {
      const jsonString = await AsyncStorage.getItem('recently_viewed');
      if (jsonString == null) return [];
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  }

  static async addRecentlyViewed(product) {
    try {
      let products = await this.getRecentlyViewed();
      // Remove if exists to move to top (matching Flutter logic)
      products = products.filter((p) => p.uid !== product.uid && p.sku !== product.sku);
      products.unshift(product);
      if (products.length > 10) {
        products = products.slice(0, 10);
      }
      await AsyncStorage.setItem('recently_viewed', JSON.stringify(products));
    } catch (e) {
      console.error('SharedPrefHelper error [addRecentlyViewed]:', e);
    }
  }

  static async getLanguageCode() {
    return (await AsyncStorage.getItem('languageCode')) || 'ar';
  }

  static async setLanguageCode(code) {
    await AsyncStorage.setItem('languageCode', code);
  }
}

export default SharedPrefHelper;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import SharedPrefHelper from './core/services/SharedPrefHelper';

const saveTheme = async () => {
  await SharedPrefHelper.setString('theme_preset', 'dark');
  const saved = await SharedPrefHelper.getString('theme_preset');
  console.log(saved); // 'dark'
};
*/
