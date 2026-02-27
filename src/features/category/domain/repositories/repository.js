// ─── Domain Repository Interface ───────────────────────────────────────────
// Mirrors Flutter's domain/repositories/repository.dart

/**
 * Interface definition for CategoryRepository.
 * JavaScript doesn't have strict interfaces, but this serves as the contract.
 */
class CategoryRepository {
  /**
   * Fetches the root categories to display in the sidebar.
   * @returns {Promise<Array>} List of Category objects
   */
  async getCategories() {
    throw new Error('Not implemented');
  }

  /**
   * Fetches a specific category by its UID to get its sub-categories.
   * @param {string} uid - Category unique ID
   * @returns {Promise<Object>} The Category object containing sub-categories
   */
  async getCategoryById(uid) {
    throw new Error('Not implemented');
  }
}

export default CategoryRepository;
