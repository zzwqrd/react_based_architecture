// ─── Product List Data Source ──────────────────────────────────────────────
// Mirrors Flutter's ProductListRemoteDataSource

import ApiClient from '../../../../core/services/ApiClient';
import { productsQuery } from '../models/graphql_queries';

/**
 * Fetches products for a given category with pagination & sorting.
 * Returns { items, totalCount }.
 */
export const getProducts = async ({
  categoryId,
  page = 1,
  pageSize = 20,
  sortField = 'position',
  sortDirection = 'ASC',
}) => {
  const query = productsQuery({ categoryId, sortField, sortDirection, page, pageSize });

  const res = await ApiClient.graphQLQuery(query, {
    dataKey: 'products',
    requireAuth: false,
  });

  return {
    items: res.data?.items ?? [],
    totalCount: res.data?.total_count ?? 0,
  };
};

/*
=========================================
كيفية التعامل مع (REST API) بدلاً من (GraphQL) للبحث
=========================================
غالباً ما تحتوي واجهات الـ REST على دوال (Endpoints) مخصصة للبحث والفلترة.
يمكنك تحويل هذه الدالة واستغلال `queryParameters` في `ApiClient.get`.

مثال تطبيقي (REST API):

```javascript
export const getProductsRest = async ({ categoryId, page = 1, pageSize = 20 }) => {
  try {
    const res = await ApiClient.get('/api/products', {
      queryParameters: {
        category_id: categoryId,
        page: page,
        limit: pageSize,
      },
      requireAuth: false
    });
    
    if (res.isSuccess) {
      return {
        items: res.data?.products ?? [],
        totalCount: res.data?.total_count ?? 0,
      };
    }
    return { items: [], totalCount: 0 };
  } catch (err) {
    console.error('REST getProducts Error:', err);
    return { items: [], totalCount: 0 };
  }
};
```

=========================================
مثال على الاستخدام الحالي (Example Usage):
=========================================
import { getProducts } from './features/product_list/data/datasources/remote_data_source';

const fetchCategoryProducts = async (catId) => {
  const result = await getProducts({
    categoryId: catId,
    page: 1,
    pageSize: 10,
    sortField: 'price',
    sortDirection: 'DESC'
  });
  
  console.log('إجمالي المنتجات المتاحة:', result.totalCount);
  console.log('المنتجات المحملة في هذه الصفحة:', result.items);
};
*/
