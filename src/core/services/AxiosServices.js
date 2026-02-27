import axios from 'axios';
import { AppConstants } from '../constants/AppConstants';
import { HelperResponse } from './HelperResponse';
import LoggingInterceptor from './LoggingInterceptor';
import { UserModel } from './UserModel';

/**
 * AxiosServices.js
 * Mirrors Flutter's DioServices.
 * Singleton class for handling all network requests with Axios.
 */
class AxiosServices {
  constructor() {
    this.instance = axios.create({
      baseURL: AppConstants.baseUrl,
      timeout: 30000,
      validateStatus: (status) => status >= 100 && status < 600,
      headers: {
        'Accept-Charset': 'utf-8',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'ar',
        'Connection': 'keep-alive',
        'sec-ch-ua': 'Chromium;v=142, Google Chrome;v=142, Not_A Brand;v=99',
        'server': 'AmazonS3',
        'Origin': 'https://www.fakestore.com/',
        'Referer': 'https://www.fakestore.com/',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    this.loggingInterceptor = new LoggingInterceptor();
    this._setupInterceptors();
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new AxiosServices();
    }
    return this._instance;
  }

  /**
   * Updates the global Authorization header.
   * Mirrors DioServices token logic.
   */
  async updateAuthToken(token) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  async _setupInterceptors() {
    // Request Interceptor
    this.instance.interceptors.request.use(
      async (config) => {
        // Only add token if not explicitly skipped
        if (config.skipAuth !== true) {
          // Sync with UserModel (matching Flutter's session management)
          const user = await UserModel.load();
          if (user.isAuth) {
            config.headers.Authorization = `Bearer ${user.data.access.token}`;
          }
        } else {
          // Explicitly remove it if it was added by defaults
          delete config.headers.Authorization;
        }

        return this.loggingInterceptor.requestInterceptor(config);
      },
      (error) => {
        return this.loggingInterceptor.errorInterceptor(error);
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return this.loggingInterceptor.responseInterceptor(response);
      },
      async (error) => {
        return this.loggingInterceptor.errorInterceptor(error);
      }
    );
  }

  // REST Methods
  async get(path, { queryParameters = null, headers = null, requireAuth = true, cache = false, retryCount = 0 } = {}) {
    try {
      const response = await this.instance.get(path, {
        params: queryParameters,
        ...(headers && { headers }),
        skipAuth: !requireAuth,
      });
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async post(path, { data = null, formData = null, queryParameters = null, headers = null, requireAuth = true, isFormData = false } = {}) {
    try {
      const payload = isFormData ? formData : data;
      const response = await this.instance.post(path, payload, {
        params: queryParameters,
        headers: {
          ...(headers || {}),
          ...(isFormData && { 'Content-Type': 'multipart/form-data' }),
        },
        skipAuth: !requireAuth,
      });
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async put(path, { data = null, queryParameters = null, headers = null, requireAuth = true } = {}) {
    try {
      const response = await this.instance.put(path, data, {
        params: queryParameters,
        ...(headers && { headers }),
        skipAuth: !requireAuth,
      });
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async patch(path, { data = null, queryParameters = null, headers = null, requireAuth = true } = {}) {
    try {
      const response = await this.instance.patch(path, data, {
        params: queryParameters,
        ...(headers && { headers }),
        skipAuth: !requireAuth,
      });
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async delete(path, { queryParameters = null, headers = null, requireAuth = true } = {}) {
    try {
      const response = await this.instance.delete(path, {
        params: queryParameters,
        ...(headers && { headers }),
        skipAuth: !requireAuth,
      });
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async download(urlPath, savePath, { queryParameters = null, headers = null, requireAuth = true } = {}) {
    try {
      const response = await this.instance.get(urlPath, {
        params: queryParameters,
        ...(headers && { headers }),
        skipAuth: !requireAuth,
        responseType: 'blob', // Mirroring download logic
      });
      // In RN, you'd use a file system library to save this blob to savePath
      console.log(`📥 Download initiated for ${urlPath} to ${savePath}`);
      return this._processResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  _processResponse(response) {
    const { status, data } = response;
    const stringData = String(data);

    // 1. Check for Malformed HTML/Script response (mirroring Flutter's check)
    if (stringData.includes('DOCTYPE') || stringData.includes('<html') || stringData.includes('<script')) {
      console.error(`⚠️ [AxiosServices] Malformed response (HTML) received for [${status}]`);
      return HelperResponse.badRequest({
        statusCode: status,
        message: 'Malformed response received (expected JSON, got HTML).',
        error: data,
      });
    }

    // 2. Handle Success (200, 201, 204)
    if (status === 200 || status === 201) {
      return HelperResponse.success({
        statusCode: status,
        message: data?.message || 'Success',
        data: data,
      });
    }

    if (status === 204) {
      return HelperResponse.success({
        statusCode: 204,
        message: 'No content',
        data: null,
      });
    }

    // 3. Handle specific error codes mirroring Flutter
    if (status === 400) {
      return HelperResponse.badRequest({
        statusCode: 400,
        message: data?.message || 'Bad request',
        error: data,
      });
    }

    if (status === 401) {
      return HelperResponse.unauthorized({
        statusCode: 401,
        message: data?.message || 'Session expired',
      });
    }

    if (status === 403) {
      return HelperResponse.badRequest({
        statusCode: 403,
        message: 'Access Denied (403 Forbidden)',
        error: data,
      });
    }

    if (status === 404) {
      return HelperResponse.badRequest({
        statusCode: 404,
        message: 'Resource not found',
        error: data,
      });
    }

    if (status >= 500) {
      
      return HelperResponse.serverError({
        statusCode: status,
        message: 'Server error, please try again later.',
      });
    }

    // Default error
    return HelperResponse.badRequest({
      statusCode: status,
      message: data?.message || 'Unknown error',
      error: data,
    });
  }

  _handleError(error) {
    if (error.response) {
      // With validateStatus: true, many errors will actually go to _processResponse
      return this._processResponse(error.response);
    } else if (error.request) {
      return HelperResponse.noInternet({ message: 'No response from server (Network Error)' });
    } else {
      return HelperResponse.unknownError({ message: error.message });
    }
  }
}

export default AxiosServices.getInstance();

/*
=========================================
مثال شامل ومتقدم على الاستخدام (Advanced Example Usage):
=========================================
import AxiosServices from './core/services/AxiosServices';

// عادةً لا نقوم باستدعاء AxiosServices مباشرة في ملفات الـ UI، 
// بل نستخدم (ApiClient) كما شرحنا، حيث أنه يقوم بتغليف AxiosServices بالكامل.
// ولكن إذا احتجت لاستخدام AxiosServices لسبب أكثر تعميداً فهذه أمثلة قوية:

const AdvancedNetworkExamples = async () => {

  // 1. طلب (GET) مع تخطي المصادقة (لا نحتاج لتوكن هنا) وإرسال بارامترات (Query Parameters)
  const getNoAuth = await AxiosServices.get('/public-news', {
    requireAuth: false, // سيتجاهل إضافة التوكن بفضل interceptor
    queryParameters: { limit: 10, page: 2 }
  });
  if (getNoAuth.isSuccess) {
    console.log('أخبار عامة:', getNoAuth.data);
  }

  // 2. إرسال ملف (FormData Upload) مع رأس مخصص (Custom Header)
  const form = new FormData();
  form.append('profile_image', {
    name: 'photo.jpg',
    type: 'image/jpeg',
    uri: 'file:///path/to/my/photo.jpg',
  });
  form.append('user_id', '12345');

  const uploadResponse = await AxiosServices.post('/users/avatar', {
    formData: form,
    isFormData: true, // مهم جداً لتحويل Content-Type إلى multipart/form-data
    requireAuth: true,
    headers: { 'X-Custom-Platform': 'React-Native-App' } // رأس إضافي
  });
  
  if (uploadResponse.isSuccess) {
    console.log('تم رفع الصورة بنجاح!', uploadResponse.data);
  } else {
    // بفضل HelperResponse يمكننا دائماً قراءة رسائل الخطأ بأمان
    console.error('فشل الرفع:', uploadResponse.message);
  }

  // 3. تحديث التوكن يدوياً في الهيدر الثابت
  // (علماً أن الـ Interceptor يجلبه تلقائياً من UserModel، لكن هذه الميثود موجودة كخيار للمطور)
  await AxiosServices.updateAuthToken('new-super-secret-token-abcd');
};
*/
