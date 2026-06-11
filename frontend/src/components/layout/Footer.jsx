import { Link } from 'react-router-dom';
import Newsletter from '../home/Newsletter';


const footerLinks = {
  Shop: [
    { label: 'All Products', to: '/products' },
    { label: 'Electronics', to: '/products?category=electronics' },
    { label: 'Fashion', to: '/products?category=fashion' },
    { label: 'Footwear', to: '/products?category=footwear' },
  ],
  Support: [
    { label: 'Help Center', to: '#' },
    { label: 'Shipping Info', to: '#' },
    { label: 'Returns', to: '#' },
    { label: 'Contact Us', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Press', to: '#' },
    { label: 'Affiliates', to: '#' },
  ],
  Account: [
    { label: 'Sign In', to: '/login' },
    { label: 'Register', to: '/register' },
    { label: 'My Orders', to: '/account/orders' },
    { label: 'Wishlist', to: '/account/wishlist' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
                         <img src="https://img.favpng.com/2/11/0/shopping-cart-icon-e-commerce-icon-buy-icon-dcTZ0kwg.jpg" alt="logo" fill="currentColor" className='w-8 h-8 rounded-2xl bg-transparent ' />
              Ecom-Store
            </Link>
            <p className="mt-3 text-sm text-slate-400">Premium shopping, simplified.</p>
            <div className="mt-4 flex gap-3">
              {['twitter', 'instagram', 'facebook'].map((social) => (
                <a key={social} href="#" aria-label={social} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-2 sm:flex-row">
          <p className="text-sm text-slate-500">&copy; 2026 Store. All rights reserved.</p>
                <Newsletter />
          <div className="flex gap-4 text-xs text-slate-500">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
