import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
<div className="absolute inset-0 bg-gradient-to-br flex justify-center items-center from-blue-950/80 via-slate-900/90 to-slate-950">      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 text-xl font-bold text-white">
         <img src="https://img.favpng.com/2/11/0/shopping-cart-icon-e-commerce-icon-buy-icon-dcTZ0kwg.jpg" alt="logo" fill="currentColor" className='w-8 h-8 rounded-2xl bg-transparent ' />
          Ecom-Store
        </Link>
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
