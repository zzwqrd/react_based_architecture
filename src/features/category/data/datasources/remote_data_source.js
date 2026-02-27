// ─── Category Data Source ──────────────────────────────────────────────────
// Mirrors Flutter's CategoryRemoteDataSource

import ApiClient from '../../../../core/services/ApiClient';
import {CATEGORIES_QUERY, categoryByIdQuery} from '../models/graphql_queries';

/**
 * Builds full image URL from Magento's raw category image field.
 */
export const buildCategoryImageUrl = raw => {
  if (!raw) return null;
  if (raw.startsWith('http')) return raw;
  const cleaned = raw.startsWith('/') ? raw : `/media/catalog/category/${raw}`;
  return `https://m2.alothemes.com/orfarm/english_2${cleaned}`;
};

/**
 * Fetches all categories and returns sidebar items (items[0].children).
 * Mirrors Flutter's CategoryRemoteDataSource.getCategories().
 */
export const getCategories = async () => {
  const res = await ApiClient.graphQLQuery(CATEGORIES_QUERY, {
    dataKey: 'categories',
    requireAuth: false,
  });

  const items = res.data?.items ?? [];
  const sidebarCategories = items.length > 0 ? items[0].children ?? [] : [];

  return sidebarCategories;
};

/**
 * Fetches a category by its UID (with children and products).
 * Mirrors Flutter's CategoryRemoteDataSource.getCategoryById().
 */
export const getCategoryById = async uid => {
  const query = categoryByIdQuery(uid);
  const res = await ApiClient.graphQLQuery(query, {
    dataKey: 'categories',
    requireAuth: false,
  });

  const items = res.data?.items ?? [];
  return items.length > 0 ? items[0] : null;
};

/*
=========================================
كيفية التعامل مع (REST API) بدلاً من (GraphQL)
=========================================
إذا أردت لاحقاً تحويل هذا الملف ليعمل باستخدام REST API لجلب الأقسام، يمكنك استخدام 
`ApiClient.get` بدلاً من `ApiClient.graphQLQuery`.

مثال تطبيقي (REST API):

```javascript
export const getCategoriesRest = async () => {
  try {
    const res = await ApiClient.get('/api/categories', {
      requireAuth: false
    });
    
    if (res.isSuccess) {
      // يعتمد على هيكلية الردود الخاصة بـ REST لديك
      return res.data?.items ?? [];
    }
    return [];
  } catch (err) {
    console.error('REST getCategories Error:', err);
    return [];
  }
};
```

=========================================
مثال على الاستخدام الحالي (Example Usage):
=========================================
import { getCategories, getCategoryById } from './features/category/data/datasources/remote_data_source';

const loadSidebar = async () => {
  // جلب الأقسام وتخزينها في الـ State
  const categories = await getCategories();
  console.log('عدد الأقسام الرئيسية:', categories.length);
};

const loadCategoryPage = async (uid) => {
  // عرض تفاصيل قسم معين
  const details = await getCategoryById(uid);
  if (details) {
    console.log('اسم القسم:', details.name);
  }
};
*/
