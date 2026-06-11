import { useState } from 'react';
import { categories } from '../../data/categories';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export default function ProductFilters({ filters, updateFilter, totalCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => updateFilter('category', '')}
              className="accent-indigo-600"
            />
            All Categories
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => updateFilter('category', cat.slug)}
                className="accent-indigo-600"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('min', e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('max', e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          updateFilter('category', '');
          updateFilter('min', '');
          updateFilter('max', '');
        }}
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="glass-card sticky top-24 p-6">
          <FilterContent />
        </div>
      </aside>
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <p className="text-sm text-slate-500">{totalCount} products</p>
        <Button variant="outline" size="sm" onClick={() => setMobileOpen(true)}>
          Filters
        </Button>
      </div>
      <Modal isOpen={mobileOpen} onClose={() => setMobileOpen(false)} title="Filters">
        <FilterContent />
        <Button className="mt-4 w-full" onClick={() => setMobileOpen(false)}>
          Apply Filters
        </Button>
      </Modal>
    </>
  );
}
