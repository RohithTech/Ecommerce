import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem, { CartSummary } from '../components/cart/CartItem';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Shopping Cart</h1>
      <p className="mt-1 text-slate-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
