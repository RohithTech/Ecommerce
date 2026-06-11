import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, rank, variant = 'default' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900">
      {rank && (
        <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
          #{rank}
        </span>
      )}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 opacity-0 shadow transition-all group-hover:opacity-100 dark:bg-slate-800/80"
      >
        <svg
          className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
          fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <Badge variant="sale" className="absolute bottom-3 left-3">
            -{discount}%
          </Badge>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge variant="stock" className="absolute bottom-3 right-3">
            Only {product.stock} left
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} count={product.reviewCount} className="mt-2" />
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, variant, showRank }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, idx) => (
        <ProductCard
          key={product._id}
          product={product}
          variant={variant}
          rank={showRank ? idx + 1 : undefined}
        />
      ))}
    </div>
  );
}
