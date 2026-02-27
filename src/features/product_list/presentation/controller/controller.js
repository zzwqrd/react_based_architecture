// ─── ProductList Controller (Hook) ──────────────────────────────────────────
// Mirrors Flutter's ProductListCubit (product_list/presentation/manager/controller.dart)
// Contains ALL business logic: pagination, search, sorting.

import { useState, useEffect, useCallback } from 'react';
import { GetProductsUseCase } from '../../domain/usecases/usecases';

const PAGE_SIZE = 20;

/**
 * useProductListController
 * Mirrors Flutter's ProductListCubit.
 * Manages: product list, pagination, search filter, loading states.
 */
const useProductListController = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortField, setSortField] = useState('position');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    resetAndFetch();
  }, [categoryId, sortField]);

  const resetAndFetch = useCallback(async () => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setSearchText('');
    await fetchPage(1, true);
  }, [categoryId, sortField]);

  const fetchPage = useCallback(async (page = 1, reset = false) => {
    if (reset) { setLoading(true); } else { setPaginationLoading(true); }

    try {
      const { items, totalCount } = await GetProductsUseCase({
        categoryId,
        page,
        pageSize: PAGE_SIZE,
        sortField,
      });

      setProducts((prev) => reset ? items : [...prev, ...items]);
      setCurrentPage(page);
      setHasMore(page * PAGE_SIZE < totalCount);
    } catch (e) {
      console.error('❌ [useProductListController] fetch error:', e);
      if (reset) setProducts([]);
    } finally {
      setLoading(false);
      setPaginationLoading(false);
    }
  }, [categoryId, sortField]);

  const loadMore = useCallback(() => {
    if (!paginationLoading && hasMore) {
      fetchPage(currentPage + 1);
    }
  }, [paginationLoading, hasMore, currentPage, fetchPage]);

  const changeSort = useCallback((field) => {
    setSortField(field);
  }, []);

  // Client-side search filter
  const filteredProducts = searchText.trim()
    ? products.filter((p) => p.name?.toLowerCase().includes(searchText.toLowerCase()))
    : products;

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    paginationLoading,
    hasMore,
    searchText,
    sortField,
    setSearchText,
    changeSort,
    loadMore,
    refresh: resetAndFetch,
  };
};

export default useProductListController;
