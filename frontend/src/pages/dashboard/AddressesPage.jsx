import { useState } from 'react';
import { defaultAddresses } from '../../data/users';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: '', name: '', phone: '', street: '', city: '', state: '', pincode: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddresses((prev) => [
      ...prev,
      { ...form, id: `addr${Date.now()}`, userId: 'u1', isDefault: prev.length === 0 },
    ]);
    setForm({ label: '', name: '', phone: '', street: '', city: '', state: '', pincode: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Saved Addresses</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Address'}
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="glass-card mb-6 space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Label" name="label" value={form.label} onChange={handleChange} placeholder="Home, Office..." required />
            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Street" name="street" value={form.street} onChange={handleChange} required />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="City" name="city" value={form.city} onChange={handleChange} required />
            <Input label="State" name="state" value={form.state} onChange={handleChange} required />
            <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} required />
          </div>
          <Button type="submit">Save Address</Button>
        </form>
      )}
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{addr.label}</span>
                  {addr.isDefault && <Badge variant="default">Default</Badge>}
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {addr.name}<br />
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.pincode}<br />
                  {addr.phone}
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(addr.id)} className="text-rose-500">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
