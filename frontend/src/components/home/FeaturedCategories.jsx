import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Shop by Category</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Explore our curated collections</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="group min-w-35 shrink-0 snap-start sm:min-w-0"
          >
            <div className="glass-card overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold">{cat.name}</h3>
                <p className="text-xs text-slate-500">{cat.productCount} items</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
