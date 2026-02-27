// ─── Domain Use Cases ──────────────────────────────────────────────────────
// Mirrors Flutter's product_details/domain/usecases/get_product_details_usecase.dart

import productDetailsRepositoryImpl from '../../data/repositories_impl/repository_impl';

/**
 * GetProductDetailsUseCase
 * Fetches product details including gallery and reviews.
 */
export const GetProductDetailsUseCase = async (sku) => {
  return await productDetailsRepositoryImpl.getProductDetails(sku);
};
