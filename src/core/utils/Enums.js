/**
 * Enums.js
 * Mirrors Flutter's enums.dart.
 */

export const RequestState = {
  loading: 'loading',
  done: 'done',
  error: 'error',
  empty: 'empty',
  initial: 'initial',
};

// Helper functions for RequestState (since JS doesn't have Dart's extension getters)
export const checkRequestState = {
  isLoading: (state) => state === RequestState.loading,
  isDone: (state) => state === RequestState.done,
  isError: (state) => state === RequestState.error,
  isEmpty: (state) => state === RequestState.empty,
  isInitial: (state) => state === RequestState.initial,
};

export const ErrorType = {
  network: 'network',
  server: 'server',
  backEndValidation: 'backEndValidation',
  unknown: 'unknown',
  none: 'none',
  unAuth: 'unAuth',
  empty: 'empty',
};

export const checkErrorType = {
  isNetwork: (type) => type === ErrorType.network,
  isServer: (type) => type === ErrorType.server,
  isBackEndValidation: (type) => type === ErrorType.backEndValidation,
  isUnknown: (type) => type === ErrorType.unknown,
  isEmpty: (type) => type === ErrorType.empty,
  isUnAuth: (type) => type === ErrorType.unAuth,
  isNone: (type) => type === ErrorType.none,
};

/**
 * Note: ResponseState and ErrorRequestType are also used in HelperResponse.js 
 * for consistency with the existing network implementation.
 */
export const ResponseState = {
  success: 'success',
  noInternet: 'noInternet',
  poorConnection: 'poorConnection',
  timeout: 'timeout',
  badRequest: 'badRequest',
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
  noInternet: 'noInternet',
  poorConnection: 'poorConnection',
  timeout: 'timeout',
  badRequest: 'badRequest',
  unauthorized: 'unauthorized',
  forbidden: 'forbidden',
  notFound: 'notFound',
  validationError: 'validationError',
  tooManyRequests: 'tooManyRequests',
  serverError: 'serverError',
  cancelled: 'cancelled',
  badCertificate: 'badCertificate',
  malformedResponse: 'malformedResponse',
  unknown: 'unknown',
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { RequestState, checkRequestState } from './core/utils/Enums';

const checkState = (currentState) => {
  if (checkRequestState.isLoading(currentState)) {
    console.log('جاري التحميل...');
  } else if (currentState === RequestState.done) {
    console.log('تمت العملية');
  }
};
*/
