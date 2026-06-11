import Select from '../components/ui/Select';
import Pagination from '../components/ui/Pagination';
import ProductFilters from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';

export default function ProductListingPage() {
  const { filters, paginatedProducts, totalPages, totalCount, updateFilter, setPage } = useProductFilters();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {filters.query ? `Results for "${filters.query}"` : 'All Products'}
        </h1>
        <p className="mt-1 text-slate-500">{totalCount} products found</p>
      </div>
      <div className="flex gap-8">
        <ProductFilters filters={filters} updateFilter={updateFilter} totalCount={totalCount} />
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="text-sm text-slate-500">Showing {paginatedProducts.length} of {totalCount}</p>
            <Select
              value={filters.sort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="w-48"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </Select>
          </div>
          <div className="mb-4 lg:hidden">
            <Select value={filters.sort} onChange={(e) => updateFilter('sort', e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </Select>
          </div>
          {paginatedProducts.length === 0 ? (
            <p className="py-16 text-center text-slate-500">No products match your filters.</p>
          ) : (
            <ProductGrid products={paginatedProducts} />
          )}
          <div className="mt-10">
            <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
