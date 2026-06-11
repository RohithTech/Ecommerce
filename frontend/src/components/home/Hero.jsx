import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-600 via-slate-600 to-indigo-950" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Spring Sale — Up to 40% Off
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium shopping, simplified.
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Discover curated collections from top brands. Free shipping on orders over $50.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products">
              <Button size="lg" className=" text-indigo-600 hover:bg-indigo-400">
                Shop Now
              </Button>
            </Link>
            <Link to="/products?sort=price-desc">
              <Button size="lg" variant="outline" className="border-white text-white bg-gray-500 hover:bg-white/10">
                View Deals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
