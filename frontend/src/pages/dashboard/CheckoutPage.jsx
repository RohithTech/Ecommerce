import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useOrderTotals } from '../../components/cart/CartItem';
import { formatPrice } from '../../utils/formatPrice';
import ShippingAddressForm, { PaymentMethodSelector } from '../../components/checkout/CheckoutForms';
import Button from '../../components/ui/Button';
import {address as add} from '../../data/users'
import success from '../../components/alert/success'

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { subtotal, shipping, tax, total } = useOrderTotals();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
     name: add.name,
     phone: add.phone,
     street: add.street,
     city: add.city, 
     state: add.state,
     pincode: add.pincode });
  const [errors, setErrors] = useState({});

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Nothing to checkout</h1>
        <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="glass-card p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Order Placed!</h1>
          <p className="mt-2 text-slate-500">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <Button className="mt-6" onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      placeOrder(items, total);
      clearCart();
      setPlaced(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="glass-card p-6">
            <h2 className="text-lg font-bold">Shipping Address</h2>
            <div className="mt-4">
              <ShippingAddressForm form={form} onChange={handleChange} errors={errors} />
            </div>
          </section>
          <section className="glass-card p-6">
            <h2 className="text-lg font-bold">Payment Method</h2>
            <div className="mt-4">
              <PaymentMethodSelector selected={payment} onChange={setPayment} />
            </div>
          </section>
        </div>
        <div className="glass-card h-fit p-6">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.product.name} × {item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
            <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Tax</dt><dd>{formatPrice(tax)}</dd></div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold dark:border-slate-700">
              <dt>Total</dt><dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button type="submit" className="mt-6 w-full" size="lg" onClick={success}>Place Order</Button>
        </div>
      </form>
    </div>
  );
}
