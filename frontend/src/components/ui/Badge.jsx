import { cn } from '../../utils/cn';

const variants = {
  sale: 'bg-rose-500 text-white',
  new: 'bg-emerald-500 text-white',
  stock: 'bg-slate-500 text-white',
  default: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
};

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
