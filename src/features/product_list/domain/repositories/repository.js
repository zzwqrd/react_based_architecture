// ─── Domain Repository Interface ───────────────────────────────────────────
// Mirrors Flutter's product_list/domain/repositories/repository.dart

class ProductListRepository {
  /**
   * Fetches products based on criteria.
   * @param {Object} params
   * @returns {Promise<Object>} { items, totalCount }
   */
  async getProducts(params) {
    throw new Error('Not implemented');
  }
}

export default ProductListRepository;
