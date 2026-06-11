import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileMenu({ isOpen, onClose, onSearch, searchQuery, setSearchQuery }) {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            ✕
          </button>
        </div>
        <form onSubmit={onSearch} className="mb-6">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
          />
        </form>
        <nav className="flex flex-col gap-1">
          <Link to="/" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
          <Link to="/products" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Shop All</Link>
          <Link to="/cart" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Cart</Link>
          {isAuthenticated ? (
            <>
              <Link to="/account/profile" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">My Account</Link>
              <Link to="/account/orders" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Orders</Link>
              <Link to="/account/wishlist" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Wishlist</Link>
              {isAdmin && (
                <Link to="/admin" onClick={onClose} className="rounded-xl px-4 py-3 font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950">Admin</Link>
              )}
              <button onClick={() => { logout(); onClose(); }} className="rounded-xl px-4 py-3 text-left font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950">
                Sign Out ({user?.name})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Sign In</Link>
              <Link to="/register" onClick={onClose} className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
