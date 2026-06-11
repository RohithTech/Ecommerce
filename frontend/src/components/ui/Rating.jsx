import { cn } from '../../utils/cn';

function Star({ filled, half, className }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      {half ? (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        fill={half ? 'url(#half)' : 'currentColor'}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

export default function Rating({ value, max = 5, showValue = false, count, size = 'sm' }) {
  const sizeClass = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = value >= starValue;
        const half = !filled && value >= starValue - 0.5;
        return (
          <Star
            key={i}
            filled={filled}
            half={half}
            className={cn(
              sizeClass,
              filled || half ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
            )}
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span className="ml-1 text-sm text-slate-500">({count})</span>
      )}
    </div>
  );
}
