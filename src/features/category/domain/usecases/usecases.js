// ─── Domain Use Cases ──────────────────────────────────────────────────────
// Mirrors Flutter's domain/usecases/usecases.dart

import categoryRepositoryImpl from '../../data/repositories_impl/repository_impl';

/**
 * GetCategoriesUseCase
 * Gets the main categories for the sidebar.
 */
export const GetCategoriesUseCase = async () => {
  return await categoryRepositoryImpl.getCategories();
};

/**
 * GetCategoryByIdUseCase
 * Gets details (including subcategories) for a specific category.
 */
export const GetCategoryByIdUseCase = async (uid) => {
  return await categoryRepositoryImpl.getCategoryById(uid);
};
