import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * UserModel.js
 * Mirrors Flutter's UserModel (model.dart).
 * Implements a singleton-like pattern for managing user data and session.
 */
class UserModel {
  constructor(message = '', data = null) {
    this.message = message;
    this.data = data;
  }

  // Singleton instance
  static instance = new UserModel();

  /**
   * Factory constructor for creating from JSON
   */
  static fromJson(json) {
    return new UserModel(
      json.message || '',
      json.data ? Data.fromJson(json.data) : null
    );
  }

  /**
   * Convert to JSON
   */
  toJson() {
    return {
      message: this.message,
      data: this.data ? this.data.toJson() : null,
    };
  }

  /**
   * Authentication check
   */
  get isAuth() {
    return !!(this.data && this.data.access && this.data.access.token);
  }

  /**
   * Save to AsyncStorage
   */
  async save() {
    try {
      const json = this.toJson();
      await AsyncStorage.setItem('user', JSON.stringify(json));
      UserModel._updateInstance(json);
    } catch (e) {
      console.error('UserModel save error:', e);
    }
  }

  /**
   * Clear user data
   */
  static async clear() {
    try {
      await AsyncStorage.removeItem('user');
      UserModel.instance = new UserModel();
    } catch (e) {
      console.error('UserModel clear error:', e);
    }
  }

  /**
   * Load user data
   */
  static async load() {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const json = JSON.parse(userJson);
        UserModel.instance = UserModel.fromJson(json);
      }
      return UserModel.instance;
    } catch (e) {
      await UserModel.clear();
      return UserModel.instance;
    }
  }

  /**
   * Update singleton instance
   */
  static _updateInstance(json) {
    UserModel.instance = UserModel.fromJson(json);
  }
}

class Data {
  constructor({ user, access }) {
    this.user = user;
    this.access = access;
  }

  static fromJson(json) {
    return new Data({
      user: json.user ? User.fromJson(json.user) : null,
      access: json.access ? Access.fromJson(json.access) : null,
    });
  }

  toJson() {
    return {
      user: this.user ? this.user.toJson() : null,
      access: this.access ? this.access.toJson() : null,
    };
  }
}

class Access {
  constructor({ authType, token, expiresAt }) {
    this.authType = authType;
    this.token = token;
    this.expiresAt = expiresAt;
  }

  static fromJson(json) {
    return new Access({
      authType: json.auth_type || '',
      token: json.token || '',
      expiresAt: json.expires_at ? new Date(json.expires_at) : null,
    });
  }

  toJson() {
    return {
      auth_type: this.authType,
      token: this.token,
      expires_at: this.expiresAt ? this.expiresAt.toISOString() : null,
    };
  }
}

class User {
  constructor(props) {
    Object.assign(this, props);
  }

  static fromJson(json) {
    return new User({
      id: json.id || 0,
      name: json.name || '',
      phone: json.phone || '',
      phoneVerified: !!json.phone_verified,
      email: json.email || '',
      emailVerified: !!json.email_verified,
      isActive: !!json.is_active,
      profilePhoto: json.profile_photo || '',
      gender: json.gender,
      dateOfBirth: json.date_of_birth,
      country: json.country || '',
      phoneCode: json.phone_code || '',
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      phone_verified: this.phoneVerified,
      email: this.email,
      email_verified: this.emailVerified,
      is_active: this.isActive,
      profile_photo: this.profilePhoto,
      gender: this.gender,
      date_of_birth: this.dateOfBirth,
      country: this.country,
      phone_code: this.phoneCode,
    };
  }
}

export { UserModel, Data, Access, User };

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { UserModel } from './core/services/UserModel';

const handleLoginResponse = (jsonPayload) => {
  const user = new UserModel(jsonPayload);
  console.log('اسم المستخدم هو:', user.data.user.name);
  console.log('رمز الوصول:', user.data.access.token);
};
*/
