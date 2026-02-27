// ─── Domain Use Cases ──────────────────────────────────────────────────────
// Mirrors Flutter's product_list/domain/usecases/get_products_usecase.dart

import productListRepositoryImpl from '../../data/repositories_impl/repository_impl';

/**
 * GetProductsUseCase
 * Fetches paginated and sorted products.
 */
export const GetProductsUseCase = async (params) => {
  return await productListRepositoryImpl.getProducts(params);
};
