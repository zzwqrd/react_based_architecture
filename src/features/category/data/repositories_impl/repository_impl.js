// ─── Data Repository Implementation ────────────────────────────────────────
// Mirrors Flutter's data/repositories_impl/repository_impl.dart

import CategoryRepository from '../../domain/repositories/repository';
import { getCategories, getCategoryById } from '../datasources/remote_data_source';

class CategoryRepositoryImpl extends CategoryRepository {
  async getCategories() {
    try {
      const categories = await getCategories();
      // In Dart, we'd return a Right(categories) here using Either
      // In JS, throwing acts as the Left()
      return categories;
    } catch (e) {
      throw e;
    }
  }

  async getCategoryById(uid) {
    try {
      const category = await getCategoryById(uid);
      return category;
    } catch (e) {
      throw e;
    }
  }
}

export default new CategoryRepositoryImpl();
