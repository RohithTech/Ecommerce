import { getReviewsByProductId } from '../../data/reviews';
import Rating from '../ui/Rating';
import { useState } from 'react';

export default function ReviewsList({ productId, productRating, reviewCount }) {
  const reviews = getReviewsByProductId(productId);
  const [filter, setFilter] = useState(0);

  const filtered = filter === 0 ? reviews : reviews.filter((r) => r.rating === filter);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="mt-12 border-t border-slate-200 pt-12 dark:border-slate-700">
      <h2 className="text-xl font-bold">Customer Reviews</h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="glass-card p-6">
          <div className="text-center">
            <p className="text-4xl font-bold">{productRating.toFixed(1)}</p>
            <Rating value={productRating} size="lg" />
            <p className="mt-1 text-sm text-slate-500">{reviewCount} reviews</p>
          </div>
          <div className="mt-6 space-y-2">
            {ratingBreakdown.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-3">{star}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-slate-500">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {[0, 5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setFilter(star)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  filter === star
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {star === 0 ? 'All' : `${star} ★`}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <p className="text-slate-500">No reviews match this filter.</p>
            ) : (
              filtered.map((review) => (
                <div key={review.id} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <Rating value={review.rating} />
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>
                  <h4 className="mt-2 font-semibold">{review.title}</h4>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{review.body}</p>
                  <p className="mt-2 text-xs text-slate-500">— {review.author}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
