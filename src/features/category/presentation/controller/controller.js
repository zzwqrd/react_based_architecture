// ─── Category Controller (Hook) ─────────────────────────────────────────────
// Mirrors Flutter's CategoryCubit (category/presentation/manager/controller.dart)
// Contains ALL business logic. The view has ZERO logic.

import { useState, useEffect, useCallback } from 'react';
import { GetCategoriesUseCase } from '../../domain/usecases/usecases';

/**
 * useCategoryController
 * Mirrors Flutter's CategoryCubit.
 * Manages: categories list, selected category, sub-categories, loading state.
 */
const useCategoryController = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sidebarCategories = await GetCategoriesUseCase();
      setCategories(sidebarCategories);

      // Auto-select first category (mirrors Cubit behavior)
      if (sidebarCategories.length > 0) {
        setSelectedCategory(sidebarCategories[0]);
      }
    } catch (e) {
      console.error('❌ [useCategoryController] fetch error:', e);
      setError(e.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Derived: sub-categories of the selected category
  const subCategories = selectedCategory?.children ?? [];

  return {
    categories,
    selectedCategory,
    subCategories,
    loading,
    error,
    selectCategory,
    refresh: fetchCategories,
  };
};

export default useCategoryController;
