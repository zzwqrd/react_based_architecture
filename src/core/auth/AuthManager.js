import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🔐 Central Authentication Manager
 * Mirrors Flutter's AuthManager (auth_manager.dart).
 */
class AuthManager {
  /**
   * Check if user is authenticated
   */
  static async isAuthenticated() {
    const token = await AsyncStorage.getItem('auth_token');
    return token !== null && token.length > 0;
  }

  /**
   * Get auth token
   */
  static async getToken() {
    return await AsyncStorage.getItem('auth_token');
  }

  /**
   * Get user email
   */
  static async getUserEmail() {
    return await AsyncStorage.getItem('user_email');
  }

  /**
   * Get user name
   */
  static async getUserName() {
    return await AsyncStorage.getItem('user_name');
  }

  /**
   * Get customer ID
   */
  static async getCustomerId() {
    return await AsyncStorage.getItem('customer_id');
  }

  /**
   * Logout and clear all auth data
   */
  static async logout() {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_email');
    await AsyncStorage.removeItem('user_name');
    await AsyncStorage.removeItem('customer_id');
    console.log('🚪 User logged out');
  }

  /**
   * Save auth data after login
   */
  static async saveAuthData({ token, email, name, customerId }) {
    await AsyncStorage.setItem('auth_token', token);
    if (email) await AsyncStorage.setItem('user_email', email);
    if (name) await AsyncStorage.setItem('user_name', name);
    if (customerId) await AsyncStorage.setItem('customer_id', customerId);
    console.log('✅ Auth data saved');
  }
}

export default AuthManager;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AuthManager from './core/auth/AuthManager';

const checkAuth = async () => {
  const isAuth = await AuthManager.isAuthenticated();
  if (isAuth) {
    console.log('المستخدم مسجل الدخول');
  }
};
*/
