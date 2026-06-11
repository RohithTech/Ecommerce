import { cn } from '../../utils/cn';

export default function QuantitySelector({ value, onChange, min = 1, max = 99, className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-600',
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="rounded-l-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        −
      </button>
      <span className="min-w-[2.5rem] px-2 text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="rounded-r-xl px-3 py-2 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        +
      </button>
    </div>
  );
}
