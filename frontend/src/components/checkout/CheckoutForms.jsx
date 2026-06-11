import Input from '../ui/Input';
import {defaultAddresses} from '../../data/users.js'

export default function ShippingAddressForm({ form, onChange, errors }) {

  // const [{name},{phone},{street},{city},{state},{pincode}]= defaultAddresses[0];
  // console.log(defaultAddresses);
  

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full Name" name="name" value={form.name} onChange={onChange} error={errors.name} required />
        <Input label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} required />
      </div>
      <Input label="Street Address" name="street" value={form.street} onChange={onChange} error={errors.street} required />
      <div className="grid gap-4 sm:grid-cols-3">
        <Input label="City" name="city" value={form.city} onChange={onChange} error={errors.city} required />
        <Input label="State" name="state" value={form.state} onChange={onChange} error={errors.state} required />
        <Input label="Pincode" name="pincode" value={form.pincode} onChange={onChange} error={errors.pincode} required />
      </div>
    </div>
  );
}

export function PaymentMethodSelector({ selected, onChange }) {
  const methods = [
    { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
    { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive' },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <label
          key={method.id}
          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all ${
            selected === method.id
              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
              : 'border-slate-200 hover:border-slate-300 dark:border-slate-700'
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={method.id}
            checked={selected === method.id}
            onChange={() => onChange(method.id)}
            className="accent-indigo-600"
          />
          <div>
            <p className="font-semibold">{method.label}</p>
            <p className="text-sm text-slate-500">{method.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
}
