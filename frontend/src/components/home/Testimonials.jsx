import { testimonials } from '../../data/testimonials';
import Rating from '../ui/Rating';

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">What Our Customers Say</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Trusted by thousands of happy shoppers</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="glass-card min-w-[300px] flex-shrink-0 snap-start p-6 md:min-w-0"
          >
            <Rating value={t.rating} />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
