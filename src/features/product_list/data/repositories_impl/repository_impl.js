// ─── Data Repository Implementation ────────────────────────────────────────
// Mirrors Flutter's product_list/data/repositories_impl/repository_impl.dart

import ProductListRepository from '../../domain/repositories/repository';
import { getProducts } from '../datasources/remote_data_source';

class ProductListRepositoryImpl extends ProductListRepository {
  async getProducts(params) {
    try {
      return await getProducts(params);
    } catch (e) {
      throw e;
    }
  }
}

export default new ProductListRepositoryImpl();
