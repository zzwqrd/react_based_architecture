/**
 * BaseModel.js
 * Mirrors Flutter's base.dart Model class and parsing helpers.
 */

import { StringExtensions } from './Extensions';

export class BaseModel {
  constructor({ id = '' } = {}) {
    this.id = id;
  }

  get hasData() {
    return this.id && this.id !== '';
  }

  static colorFromJson(json, attribute, defaultHexColor = "#000000") {
    try {
      if (!json || json[attribute] === undefined || json[attribute] === null) {
        return StringExtensions.getColor(defaultHexColor);
      }
      return StringExtensions.getColor(json[attribute].toString());
    } catch (e) {
      console.warn(`[BaseModel] Error parsing color for key: ${attribute}`, e);
      return StringExtensions.getColor(defaultHexColor);
    }
  }

  static stringFromJson(json, attribute, defaultValue = '') {
    try {
      if (!json || json[attribute] === undefined || json[attribute] === null) {
        return defaultValue;
      }
      return json[attribute].toString();
    } catch (e) {
      console.warn(`[BaseModel] Error parsing string for key: ${attribute}`, e);
      return defaultValue;
    }
  }

  static dateFromJson(json, attribute, defaultValue = null) {
    try {
      if (!json || json[attribute] === undefined || json[attribute] === null) {
        return defaultValue || new Date(0);
      }
      return new Date(json[attribute]);
    } catch (e) {
      console.warn(`[BaseModel] Error parsing date for key: ${attribute}`, e);
      return defaultValue || new Date(0);
    }
  }

  static intFromJson(json, attribute, defaultValue = 0) {
    try {
      if (!json || json[attribute] === undefined || json[attribute] === null) {
        return defaultValue;
      }
      const val = parseInt(json[attribute].toString(), 10);
      return isNaN(val) ? defaultValue : val;
    } catch (e) {
      console.warn(`[BaseModel] Error parsing int for key: ${attribute}`, e);
      return defaultValue;
    }
  }

  static doubleFromJson(json, attribute, defaultValue = 0.0, fix = null) {
    try {
      if (!json || json[attribute] === undefined || json[attribute] === null) {
        return defaultValue;
      }
      let val = parseFloat(json[attribute].toString());
      if (isNaN(val)) return defaultValue;
      if (fix !== null) {
        val = parseFloat(val.toFixed(fix));
      }
      return val;
    } catch (e) {
      console.warn(`[BaseModel] Error parsing double for key: ${attribute}`, e);
      return defaultValue;
    }
  }

  static boolFromJson(json, attribute, defaultValue = false) {
    try {
      const val = json ? json[attribute] : null;
      if (val === undefined || val === null) return defaultValue;
      if (typeof val === 'boolean') return val;
      if (typeof val === 'string') return ['1', 'true'].includes(val.toLowerCase());
      if (typeof val === 'number') return val === 1;
      return false;
    } catch (e) {
      console.warn(`[BaseModel] Error parsing bool for key: ${attribute}`, e);
      return defaultValue;
    }
  }

  static listFromJson(json, attribute, callback) {
    try {
      if (json && json[attribute] && Array.isArray(json[attribute])) {
        return json[attribute].map(v => callback(v));
      }
      return [];
    } catch (e) {
      console.warn(`[BaseModel] Error parsing list for key: ${attribute}`, e);
      return [];
    }
  }

  toJson() {
    return { id: this.id };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }
}

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import BaseModel from './core/utils/BaseModel';

class UserModel extends BaseModel {
  constructor(data) {
    super(data);
    this.name = this.getString('name', 'بدون اسم');
    this.age = this.getNumber('age', 18);
  }
}

// الاستخدام:
// const user = new UserModel({ name: 'أحمد', age: 25 });
// console.log(user.name); // 'أحمد'
*/
