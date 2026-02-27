import { LoggerDebug, LogColors } from './Logger';

/**
 * LoggingInterceptor.js
 * Mirrors Flutter's LoggingInterceptor (logger_interceptor.dart).
 * Provides structured logs for Axios requests and responses.
 */
class LoggingInterceptor {
  constructor() {
    this.logger = new LoggerDebug(LogColors.red, 'Axios Network Logger');
  }

  // Hook for Axios request interceptor
  requestInterceptor(config) {
    this.logger.green(`➡️ Request: ${config.method?.toUpperCase()} ${config.url}`);
    if (config.headers) this.logger.green(`Headers: ${JSON.stringify(config.headers, null, 2)}`);
    if (config.params) this.logger.green(`Query Parameters: ${JSON.stringify(config.params, null, 2)}`);
    if (config.data) this.logger.green(`Body: ${JSON.stringify(config.data, null, 2)}`);
    return config;
  }

  // Hook for Axios response interceptor
  responseInterceptor(response) {
    const { status, config, data } = response;
    if (status !== 200 && status !== 201) {
      this.logger.red(`⚠️ Warning: Received status code ${status} for Path: ${config.url}`);
      this.logger.red(`Data: ${JSON.stringify(data, null, 2)}`);
    } else {
      this.logger.green(`⬅️ Response [${status}] => Path: ${config.url}`);
      this.logger.green(`Data: ${JSON.stringify(data, null, 2)}`);
    }
    return response;
  }

  // Hook for Axios error interceptor
  errorInterceptor(error) {
    if (error.response) {
      this.logger.red(`❌ Error: ${error.message}`);
      this.logger.red(`Path: ${error.config?.url}`);
      this.logger.red(`Response Data: ${JSON.stringify(error.response.data, null, 2)}`);
      this.logger.red(`Status Code: ${error.response.status}`);
    } else if (error.request) {
      this.logger.red(`❌ Error: No response from server for Path: ${error.config?.url}`);
    } else {
      this.logger.red(`❌ Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
}

export default LoggingInterceptor;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import LoggingInterceptor from './core/services/LoggingInterceptor';
import axios from 'axios';

const api = axios.create();
// يتم تطبيق الـ Interceptor تلقائياً إذا كان مهيأ
// api.interceptors.request.use(LoggingInterceptor.request);
// api.interceptors.response.use(LoggingInterceptor.response);
*/
