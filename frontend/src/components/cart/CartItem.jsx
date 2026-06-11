import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import QuantitySelector from '../ui/QuantitySelector';
import Button from '../ui/Button';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 border-b border-slate-200 py-6 dark:border-slate-700">
      <Link to={`/products/${product.slug}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-32 sm:w-32">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col sm:flex-row sm:justify-between">
        <div>
          <Link to={`/products/${product.slug}`} className="font-semibold hover:text-indigo-600 dark:hover:text-indigo-400">
            {product.name}
          </Link>
          <p className="mt-1 text-lg font-bold">{formatPrice(product.price)}</p>
        </div>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <QuantitySelector
            value={quantity}
            onChange={(q) => updateQuantity(product.id, q)}
            max={product.stock}
          />
          <button
            onClick={() => removeItem(product.id)}
            aria-label="Remove item"
            className="text-sm text-rose-500 hover:text-rose-600"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="hidden text-right font-bold sm:block">
        {formatPrice(product.price * quantity)}
      </p>
    </div>
  );
}

export function CartSummary({ showCheckout = true }) {
  const { items, subtotal } = useCart();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) return null;

  return (
    <div className="glass-card sticky top-24 p-6">
      <h2 className="text-lg font-bold">Order Summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Shipping</dt>
          <dd className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Tax</dt>
          <dd className="font-medium">{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
          <dt className="font-bold">Total</dt>
          <dd className="text-lg font-bold">{formatPrice(total)}</dd>
        </div>
      </dl>
      {showCheckout && (
        <Link to="/account/checkout" className="mt-6 block">
          <Button className="w-full" size="lg">Proceed to Checkout</Button>
        </Link>
      )}
    </div>
  );
}

export function useOrderTotals() {
  const { subtotal } = useCart();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}
