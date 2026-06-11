import { useState, useEffect } from 'react';
import { ProductGrid } from '../product/ProductCard';

function CountdownTimer() {
  const [time, setTime] = useState({ h: 5, m: 23, s: 41 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex gap-2">
      {[
        { label: 'Hrs', value: pad(time.h) },
        { label: 'Min', value: pad(time.m) },
        { label: 'Sec', value: pad(time.s) },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center rounded-xl bg-white/20 px-3 py-2 backdrop-blur-sm">
          <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
          <span className="text-xs text-white/70">{label}</span>
        </div>
      ))}
    </div>
  );
}


export default function FlashSale({ products = [] }) {
  const flashProducts = (Array.isArray(products) ? products : []).filter((p) => p.isFlashSale).slice(0, 4);

  return (
    <section className="bg-linear-to-r from-indigo-900 via-purple-800 to-fuchsia-700 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Flash Sale</h2>
            <p className="mt-1 text-white/80">Limited time offers — grab them before they are gone!</p>
          </div>
          <CountdownTimer />
        </div>
        <ProductGrid products={flashProducts} />
      </div>
    </section>
  );
}

export function TrendingProducts({ products = [] }) {
  const trending = (Array.isArray(products) ? products : []).filter((p) => p.isTrending).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Trending Now</h2>
      <ProductGrid products={trending} />
    </section>
  );
}

export function BestSellers({ products = [] }) {
  const best = (Array.isArray(products) ? products : []).filter((p) => p.isBestSeller).slice(0, 4);
  return (
    <section className="bg-slate-100 py-16 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Best Sellers</h2>
        <ProductGrid products={best} showRank />
      </div>
    </section>
  );
}
