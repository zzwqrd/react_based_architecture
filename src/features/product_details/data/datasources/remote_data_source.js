// ─── Product Details Data Source ───────────────────────────────────────────
// Mirrors Flutter's ProductDetailsRemoteDataSource with fallback logic

import ApiClient from '../../../../core/services/ApiClient';
import { productBySkuQuery, productSearchQuery } from '../models/graphql_queries';

/**
 * Fetches product details by SKU or numeric ID.
 * Strategy (mirrors Flutter):
 *   1. If numeric → use search query
 *   2. If SKU → use filter query, fallback to search if empty
 *
 * @param {string} sku - Product SKU or numeric ID
 * @returns {object|null} Product details object
 */
export const getProductDetails = async (sku) => {
  const isNumeric = /^\d+$/.test(sku);

  // 1. Primary query
  const primaryQuery = isNumeric
    ? productSearchQuery(sku)
    : productBySkuQuery(sku);

  const res = await ApiClient.graphQLQuery(primaryQuery, {
    dataKey: 'products',
    requireAuth: false,
  });

  let items = res.data?.items ?? [];

  // 2. Fallback: search if filter returned empty (SKU only)
  if (items.length === 0 && !isNumeric) {
    const fallbackRes = await ApiClient.graphQLQuery(
      productSearchQuery(sku),
      { dataKey: 'products', requireAuth: false },
    );
    items = fallbackRes.data?.items ?? [];
  }

  return items.length > 0 ? items[0] : null;
};

/*
=========================================
كيفية التعامل مع (REST API) بدلاً من (GraphQL) 
=========================================
إذا كان المتجر يوفر واجهة REST لعرض التفاصيل بناءً على الـ SKU أو الـ ID، 
نستدعي الـ `ApiClient.get` مع تمرير المعرف في الرابط (Path Variable).

مثال تطبيقي (REST API):

```javascript
export const getProductDetailsRest = async (skuOrId) => {
  try {
    // بناءً على ما يقبله الباك إند
    const res = await ApiClient.get(`/api/products/${skuOrId}`, {
      requireAuth: false
    });
    
    if (res.isSuccess) {
      return res.data;
    }
    return null;
  } catch (err) {
    console.error('REST getProductDetails Error:', err);
    return null;
  }
};
```

=========================================
مثال على الاستخدام الحالي (Example Usage):
=========================================
import { getProductDetails } from './features/product_details/data/datasources/remote_data_source';

const loadProductPage = async (sku) => {
  // يقوم الكود تلقائياً بتحديد ما إذا كان المدخل رقم ID أو رمز SKU ذكي
  const product = await getProductDetails(sku);
  
  if (product) {
    console.log('تم العثور على المنتج:', product.name);
    console.log('سعر المنتج:', product.price_range?.minimum_price?.regular_price?.value);
  } else {
    console.warn('لم يتم العثور على المنتج المدخل');
  }
};
*/
