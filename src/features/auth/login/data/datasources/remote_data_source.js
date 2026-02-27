import StorageHelper from '../../../../../core/services/StorageHelper';
import ApiClient from '../../../../../core/services/ApiClient';
import AxiosServices from '../../../../../core/services/AxiosServices';
import GraphQLQueries from '../models/graphql_queries';
import { HelperResponse } from '../../../../../core/services/HelperResponse';

/**
 * LoginDataSource.js
 * Mirrors Flutter's LoginDataSourceImpl.
 * Handles the login flow using GraphQL.
 */
class LoginDataSource {
  
  /**
   * Login using email and password.
   * Mirrors the login mutation in Flutter.
   */
  async login({ email, password }) {
    try {
      const variables = { email, password };

      // استخدام ApiClient و GraphQLQueries مباشرة من الـ Import
      const response = await ApiClient.graphQLMutation(GraphQLQueries.loginMutation, {
        variables,
        requireAuth: false,
        dataKey: 'generateCustomerToken',
        fromJson: (json) => json, 
      });

      if (response.isSuccess) {
        const loginResponse = response.data;
        const token = loginResponse.token;

        if (token) {
          // استخدام StorageHelper مباشرة
          await StorageHelper.setToken(token);
          
          // تحديث الهيدرز
          await AxiosServices.updateAuthToken(token);

          return response;
        }
      }

      return response;
    } catch (e) {
      console.error('❌ [LoginDataSource] Login Error:', e);
      return HelperResponse.unknownError({ message: e.message });
    }
  }

  /**
   * Fetch customer data.
   * Mirrors getCustomerData in Flutter.
   */
  async getCustomerData(token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : null;

    return await ApiClient.graphQLQuery(GraphQLQueries.customerQuery, {
      headers,
      requireAuth: true,
      dataKey: 'customer',
      fromJson: (json) => json,
    });
  }

  /**
   * Complete login sequence (login + fetch customer data).
   * Mirrors completeLogin in Flutter.
   */
  async completeLogin({ email, password }) {
    const loginResult = await this.login({ email, password });

    if (loginResult.isSuccess) {
      const customerResult = await this.getCustomerData(loginResult.data.token);
      
      if (customerResult.isSuccess) {
        await StorageHelper.setCustomer(customerResult.data);
        
        return HelperResponse.success({
          statusCode: 200,
          data: {
            loginResponse: loginResult.data,
            token: loginResult.data.token,
            customer: customerResult.data,
          },
        });
      }
      return customerResult;
    }
    return loginResult;
  }
}

export default new LoginDataSource();

/*
=========================================
لماذا لم نستخدم `with ApiClient` كما في لغة Dart؟
=========================================
في لغة Dart، نستخدم كلمة `with` لتطبيق ما يُعرف بـ (Mixins) لدمج وظائف كلاس `ApiClient` مباشرة داخل `LoginDataSourceImpl`.
أما في لغة JavaScript، فلا يوجد دعم أصلي (Native) للـ Mixins باستخدام كلمة `with`.
لذلك، البديل الأفضل والأكثر نظافة في JavaScript هو الاعتماد على (التركيب - Composition). 
حيث نقوم باستيراد `ApiClient` كـ Singleton داخل الملف، ونقوم باستدعائه مباشرة كما في: `this.apiClient.graphQLQuery()`.
هذا يجعل الكود أسهل في القراءة ويمنحنا تلميحات برمجية (IntelliSense) أفضل.

=========================================
كيفية التعامل مع (REST API) بدلاً من (GraphQL) 
=========================================
إذا قررت في المستقبل الاعتماد على REST APIs بدلاً من GraphQL، فإن نفس الـ `ApiClient` 
يدعم ذلك تماماً عبر دوال `post` و `get`.

مثال على دالة تسجيل دخول باستخدام REST API:

```javascript
  async loginWithRest({ email, password }) {
    try {
      const response = await ApiClient.post('/api/auth/login', {
        data: { email, password },
        requireAuth: false, // لا نحتاج توكن هنا لأننا نسجل دخول للتو
        fromJson: (json) => json, // فك ترميز النتيجة
      });

      if (response.isSuccess) {
        // افترض أن الباك إند يعيد التوكن بهذا الشكل:
        const token = response.data.access_token;

        if (token) {
          // نحفظ التوكن في التخزين المحلي
          await StorageHelper.setToken(token);
          
          // نحدّث الهيدر الخاص بتطبيق الـ Axios
          await AxiosServices.updateAuthToken(token);

          return response;
        }
      }
      return response;
    } catch (e) {
      console.error('REST Login Error:', e);
      return HelperResponse.unknownError({ message: e.message });
    }
  }

  // ------------------------------------------

  // ومثال لدالة استدعاء بيانات العميل (GET) باستخدام التوكن
  async getCustomerDataWithRest(token = null) {
    const headers = token ? { Authorization: `Bearer ${token}` } : null;

    return await ApiClient.get('/api/users/me', {
      headers,
      requireAuth: true, // سيتم إرفاق التوكن تلقائياً من عبر الـ Interceptor
      fromJson: (json) => json, 
    });
  }
```

=========================================
مثال على الاستخدام (Example Usage):
=========================================
import LoginDataSource from './features/auth/login/data/datasources/remote_data_source';

const handleUserLogin = async () => {
  // الكلاس يهتم بكامل دورة الدخول: إحضار التوكن + جلب بيانات العميل وتخزينهما
  const response = await LoginDataSource.completeLogin({
    email: 'user@example.com',
    password: 'password123'
  });

  if (response.isSuccess) {
    console.log('تم الدخول بنجاح! بيانات العميل:', response.data.customer);
  } else {
    // يمكن قراءة رسالة الخطأ بأمان لأن النتيجة مغلفة بـ HelperResponse
    console.error('فشل تسجيل الدخول:', response.message);
  }
};
*/
