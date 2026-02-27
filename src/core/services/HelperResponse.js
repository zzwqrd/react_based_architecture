/**
 * HelperResponse.js
 * Mirrors Flutter's HelperResponse class.
 * Provides unified way to handle API success and error states.
 */

export const ResponseState = {
  success: 'success',
  badRequest: 'badRequest',
  noInternet: 'noInternet',
  poorConnection: 'poorConnection',
  timeout: 'timeout',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden',
  notFound: 'notFound',
  validationError: 'validationError',
  tooManyRequests: 'tooManyRequests',
  serverError: 'serverError',
  cancelled: 'cancelled',
  badCertificate: 'badCertificate',
  unknownError: 'unknownError',
};

export const ErrorRequestType = {
  badRequest: 'badRequest',
  noInternet: 'noInternet',
  poorConnection: 'poorConnection',
  timeout: 'timeout',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden',
  notFound: 'notFound',
  validationError: 'validationError',
  tooManyRequests: 'tooManyRequests',
  serverError: 'serverError',
  cancelled: 'cancelled',
  badCertificate: 'badCertificate',
  unknown: 'unknown',
  malformedResponse: 'malformedResponse',
};

export class HelperResponse {
  constructor({
    state,
    statusCode = 0,
    success,
    message,
    data = null,
    errorType = null,
    rawError = null,
  }) {
    this.state = state;
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.errorType = errorType;
    this.rawError = rawError;
  }

  static success({ statusCode = 200, message = 'Success', data = null }) {
    return new HelperResponse({
      state: ResponseState.success,
      statusCode,
      success: true,
      message,
      data,
    });
  }

  static badRequest({ statusCode = 400, message = 'Bad request', error = null }) {
    return new HelperResponse({
      state: ResponseState.badRequest,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.badRequest,
      rawError: error,
    });
  }

  static unauthorized({ statusCode = 401, message = 'Unauthorized' }) {
    return new HelperResponse({
      state: ResponseState.unauthorized,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.unauthorized,
    });
  }

  static noInternet({ statusCode = 503, message = 'No internet connection' }) {
    return new HelperResponse({
      state: ResponseState.noInternet,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.noInternet,
    });
  }

  static timeout({ statusCode = 408, message = 'Request timeout' }) {
    return new HelperResponse({
      state: ResponseState.timeout,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.timeout,
    });
  }

  static serverError({ statusCode = 500, message = 'Server error' }) {
    return new HelperResponse({
      state: ResponseState.serverError,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.serverError,
    });
  }

  static unknownError({ statusCode = 0, message = 'Unknown error', error = null }) {
    return new HelperResponse({
      state: ResponseState.unknownError,
      statusCode,
      success: false,
      message,
      errorType: ErrorRequestType.unknown,
      rawError: error,
    });
  }

  get isSuccess() {
    return this.state === ResponseState.success;
  }

  get hasData() {
    return this.data !== null;
  }
}

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import HelperResponse from './core/services/HelperResponse';

const parseApiData = (apiResponse) => {
  const result = HelperResponse.fromJson(apiResponse, (data) => data);
  if (result.isSuccess()) {
    console.log(result.data);
  } else {
    console.error(result.getMessage());
  }
};
*/
