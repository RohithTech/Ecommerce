import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { filterProducts } from '../utils/filterProducts';
import { products } from '../data/products';

const ITEMS_PER_PAGE = 12;

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('min') || '',
      maxPrice: searchParams.get('max') || '',
      query: searchParams.get('q') || '',
      sort: searchParams.get('sort') || 'newest',
      page: Number(searchParams.get('page')) || 1,
    }),
    [searchParams]
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (filters.page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, filters.page]);

  const updateFilter = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === '' || value == null) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
        if (key !== 'page') next.delete('page');
        return next;
      });
    },
    [setSearchParams]
  );

  const setPage = useCallback(
    (page) => updateFilter('page', page),
    [updateFilter]
  );

  return {
    filters,
    filteredProducts,
    paginatedProducts,
    totalPages,
    totalCount: filteredProducts.length,
    updateFilter,
    setPage,
    itemsPerPage: ITEMS_PER_PAGE,
  };
}
