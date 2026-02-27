// ─── Domain Repository Interface ───────────────────────────────────────────
// Mirrors Flutter's product_details/domain/repositories/repository.dart

class ProductDetailsRepository {
  /**
   * Fetches product details by SKU.
   * @param {string} sku
   * @returns {Promise<Object|null>}
   */
  async getProductDetails(sku) {
    throw new Error('Not implemented');
  }
}

export default ProductDetailsRepository;
