export const users = [
  { id: 'u1', name: 'Jane Doe', email: 'jane@example.com', role: 'user', joinDate: '2025-06-15', orders: 12 },
  { id: 'u2', name: 'John Smith', email: 'john@example.com', role: 'user', joinDate: '2025-08-22', orders: 5 },
  { id: 'u3', name: 'Emily Wilson', email: 'emily@example.com', role: 'user', joinDate: '2025-11-03', orders: 8 },
  { id: 'u4', name: 'Michael Brown', email: 'michael@example.com', role: 'user', joinDate: '2026-01-10', orders: 3 },
  { id: 'u5', name: 'Admin User', email: 'admin@store.com', role: 'admin', joinDate: '2025-01-01', orders: 0 },
];

 export const defaultAddresses = [
  {
    id: 'addr1',
    userId: 'u1',
    label: 'Home',
    name: 'Jane Doe',
    phone: '+1 555-0100',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    pincode: '62704',
    isDefault: true,
  },
  {
    id: 'addr2',
    userId: 'u1',
    label: 'Office',
    name: 'Jane Doe',
    phone: '+1 555-0101',
    street: '100 Main Street, Suite 400',
    city: 'Chicago',
    state: 'IL',
    pincode: '60601',
    isDefault: false,
  },
];

export const address = defaultAddresses[0];