export const orders = [
  {
    id: 'ORD-2026-001',
    userId: 'u1',
    date: '2026-03-15',
    status: 'Delivered',
    total: 429.98,
    items: [
      { productId: 'p1', name: 'Wireless Noise-Canceling Headphones', quantity: 1, price: 249.99 },
      { productId: 'p17', name: 'Vitamin C Brightening Serum', quantity: 2, price: 89.98 },
    ],
  },
  {
    id: 'ORD-2026-002',
    userId: 'u1',
    date: '2026-03-20',
    status: 'Shipped',
    total: 179.99,
    items: [
      { productId: 'p9', name: 'Ultra Boost Running Shoes', quantity: 1, price: 179.99 },
    ],
  },
  {
    id: 'ORD-2026-003',
    userId: 'u1',
    date: '2026-04-01',
    status: 'Processing',
    total: 349.99,
    items: [
      { productId: 'p22', name: 'Adjustable Dumbbells 5-52.5 lbs', quantity: 1, price: 349.99 },
    ],
  },
];

export function getOrdersByUserId(userId) {
  return orders.filter((o) => o.userId === userId);
}
