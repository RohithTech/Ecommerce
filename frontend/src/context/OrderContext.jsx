import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useLocalStorage('orders', []);

  const placeOrder = (cartItems, totalAmount) => {
    const newOrder = {
      id: Date.now(),
      userId: user?.id,
      items: cartItems,
      totalAmount,
      status: 'Pending',
      orderedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const userOrders = orders.filter(
  order => order.userId === user?.id
);

  return (
    <OrderContext.Provider
      value={{
        orders:userOrders,
        setOrders,
        placeOrder,
        updateOrderStatus,
        removeOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);

  if (!ctx) {
    throw new Error(
      'useOrders must be used within OrderProvider'
    );
  }
  return ctx;
}