// ─── Data Repository Implementation ────────────────────────────────────────
// Mirrors Flutter's product_details/data/repositories_impl/repository_impl.dart

import ProductDetailsRepository from '../../domain/repositories/repository';
import { getProductDetails } from '../datasources/remote_data_source';

class ProductDetailsRepositoryImpl extends ProductDetailsRepository {
  async getProductDetails(sku) {
    try {
      return await getProductDetails(sku);
    } catch (e) {
      throw e;
    }
  }
}

export default new ProductDetailsRepositoryImpl();
