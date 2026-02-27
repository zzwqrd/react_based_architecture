/**
 * Logger.js
 * Mirrors Flutter's LoggerDebug (logger.dart).
 * Provides colored console output for debugging.
 */

const LogColors = {
  reset: '\x1b[0m',
  black: '\x1b[30m',
  white: '\x1b[37m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

class LoggerDebug {
  constructor(headColor = '', constTitle = '') {
    this.headColor = headColor;
    this.constTitle = constTitle;
  }

  _log(color, message, title) {
    const name = `${this.headColor}${title || this.constTitle || ''}${LogColors.reset}`;
    console.log(`${color}[${name}] ${message}${LogColors.reset}`);
  }

  black(message, title) {
    this._log(LogColors.black, message, title);
  }

  white(message, title) {
    this._log(LogColors.white, message, title);
  }

  red(message, title) {
    this._log(LogColors.red, message, title);
  }

  green(message, title) {
    this._log(LogColors.green, message, title);
  }

  yellow(message, title) {
    this._log(LogColors.yellow, message, title);
  }

  blue(message, title) {
    this._log(LogColors.blue, message, title);
  }

  cyan(message, title) {
    this._log(LogColors.cyan, message, title);
  }
}

export { LoggerDebug, LogColors };

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { LoggerDebug } from './core/services/Logger';

const trackEvent = () => {
  LoggerDebug.log('Tracking user tap', { event: 'button_click' });
  LoggerDebug.error('Failed to load image');
};
*/
