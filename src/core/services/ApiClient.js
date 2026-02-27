import AxiosServices from './AxiosServices';
import { HelperResponse, ErrorRequestType, ResponseState } from './HelperResponse';

/**
 * ApiClient.js
 * Mirrors Flutter's ApiClient mixin.
 * Provides specialized methods for GraphQL and REST calls.
 */
class ApiClient {
  constructor() {
    this.axios = AxiosServices;
  }

  // GraphQL Handling
  async _handleGraphQLResponse(response, fromJson, dataKey) {
    if (response.isSuccess && response.statusCode === 200) {
      try {
        const responseData = response.data;

        // Check for Malformed HTML response (mirroring Flutter's check)
        const stringData = String(responseData);
        if (stringData.includes('DOCTYPE') || stringData.includes('<html') || stringData.includes('<script')) {
          return HelperResponse.badRequest({
            statusCode: 500,
            message: 'Malformed response received from server (HTML instead of JSON).',
            error: responseData,
          });
        }

        if (responseData && typeof responseData === 'object') {
          // Check for GraphQL errors
          if (responseData.errors && responseData.errors.length > 0) {
            const errorMessage = responseData.errors[0]?.message || 'GraphQL error';
            return HelperResponse.badRequest({
              statusCode: 400,
              message: errorMessage,
              error: responseData,
            });
          }

          // Extract data
          if (responseData.data) {
            const data = responseData.data;
            if (dataKey && data[dataKey] !== undefined) {
              return HelperResponse.success({
                statusCode: 200,
                data: fromJson(data[dataKey]),
              });
            } else {
              return HelperResponse.success({
                statusCode: 200,
                data: fromJson(data),
              });
            }
          }
        }

        return HelperResponse.success({
          statusCode: 200,
          data: fromJson(responseData),
        });
      } catch (e) {
        return HelperResponse.badRequest({
          statusCode: 500,
          message: `GraphQL parsing failed: ${e.message}`,
          error: response.data,
        });
      }
    } else {
      return response;
    }
  }

  /**
   * GraphQL Query Request
   */
  async graphQLQuery(query, { variables = null, headers = null, requireAuth = true, fromJson = (json) => json, dataKey = null } = {}) {
    const graphQLData = {
      query: query.trim(),
      ...(variables && { variables }),
    };

    const response = await this.axios.post('/graphql', {
      data: graphQLData,
      headers: { 'Content-Type': 'application/json', ...headers },
      requireAuth,
    });

    return this._handleGraphQLResponse(response, fromJson, dataKey);
  }

  /**
   * GraphQL Mutation Request
   */
  async graphQLMutation(mutation, options = {}) {
    return this.graphQLQuery(mutation, options);
  }

  /**
   * REST POST Request
   */
  async post(path, { data = null, fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.post(path, { data, requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }

  /**
   * REST GET Request
   */
  async get(path, { fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.get(path, { requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }

  /**
   * REST GET Request for Lists
   */
  async getList(path, { fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.get(path, { requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: Array.isArray(response.data) ? response.data.map(fromJson) : [],
      });
    }
    return response;
  }

  /**
   * REST PUT Request
   */
  async put(path, { data = null, fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.put(path, { data, requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }

  /**
   * REST DELETE Request
   */
  async delete(path, { fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.delete(path, { requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }

  /**
   * REST PATCH Request
   */
  async patch(path, { data = null, fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.patch(path, { data, requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }

  /**
   * DOWNLOAD Request
   */
  async download(urlPath, savePath, { requireAuth = true, ...options } = {}) {
    const response = await this.axios.download(urlPath, savePath, { requireAuth, ...options });
    return response;
  }

  /**
   * UPLOAD Request
   */
  async upload(path, { formData, fromJson = (json) => json, requireAuth = true, ...options } = {}) {
    const response = await this.axios.post(path, { formData, isFormData: true, requireAuth, ...options });
    if (response.isSuccess) {
      return HelperResponse.success({
        statusCode: response.statusCode,
        data: fromJson(response.data),
      });
    }
    return response;
  }
}

export default new ApiClient();

/*
=========================================
مثال على الاستخدام الشامل (Comprehensive Example Usage):
=========================================
import ApiClient from './core/services/ApiClient';
import { HelperResponse } from './core/services/HelperResponse';

const ApiExamples = async () => {

  // 1. طلب بيانات (GET)
  // هل يمكن استخدام const HelperResponse response = await ApiClient.get('/users') ؟
  // نعم، في الجافاسكربت نكتبها كالتالي لأن ApiClient يُرجع كائن HelperResponse دائماً إذا نجح أو فشل.
  const getResponse = await ApiClient.get('/users', { requireAuth: true });
  if (getResponse.isSuccess) { // لاحظ '.isSuccess' مفعلة كـ Getter في HelperResponse
    console.log('بيانات المستخدمين:', getResponse.data);
  } else {
    console.error('خطأ في الجلد:', getResponse.message);
  }

  // 2. طلب مصفوفة بيانات (getList)
  const listResponse = await ApiClient.getList('/products');
  if (listResponse.isSuccess) {
    console.log('عدد المنتجات:', listResponse.data.length);
  }

  // 3. إرسال بيانات (POST)
  const postResponse = await ApiClient.post('/users/create', {
    data: { name: 'أحمد', email: 'ahmed@test.com' }
  });
  if (postResponse.isSuccess) {
    console.log('تم الإنشاء بنجاح:', postResponse.data);
  }

  // 4. تحديث بيانات (PUT/PATCH)
  const putResponse = await ApiClient.put('/users/1', {
    data: { name: 'أحمد المحدث' }
  });
  if (putResponse.isSuccess) {
    console.log('تم التحديث:', putResponse.data);
  }

  // 5. حذف بيانات (DELETE)
  const deleteResponse = await ApiClient.delete('/users/1');
  if (deleteResponse.isSuccess) {
    console.log('تم الحذف بنجاح');
  }

  // 6. استخدام GraphQL
  const query = `query { user(id: 1) { name email } }`;
  const gqlResponse = await ApiClient.graphQLQuery(query);
  if (gqlResponse.isSuccess) {
    console.log('البيانات من GraphQL:', gqlResponse.data);
  }
};
*/
