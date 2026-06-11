import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const statusVariant = {
  Delivered: 'new',
  Shipped: 'default',
  Pending: 'sale',
};

export default function OrdersPage() {
  const { orders } = useOrders();
   const { user } = useAuth();
   

  if (orders.length === 0) {
    return (
      <EmptyState title="No orders yet" description="When you place an order, it will appear here." />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-slate-500">{new Date(order.orderedAt).toLocaleDateString()}</p>
            </div>
            <Badge variant={statusVariant[order.status] || 'default'}>{order.status}</Badge>
          </div>
          <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{item.product.name} × {item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right font-bold">Total: {formatPrice(order.totalAmount)}</p>
        </div>
      ))}
    </div>
  );
}
