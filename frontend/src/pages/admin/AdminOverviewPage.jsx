import { formatPrice } from '../../utils/formatPrice';
import { products } from '../../data/products';
import { orders } from '../../data/orders';
import { users } from '../../data/users';

function StatCard({ label, value, change, icon }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {change && <p className="mt-1 text-sm text-emerald-600">{change}</p>}
    </div>
  );
}

const chartData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 90 },
  { month: 'Apr', value: 85 },
  { month: 'May', value: 95 },
];

export default function AdminOverviewPage() {
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p className="mt-1 text-slate-500">Welcome back, Admin</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatPrice(revenue + 12450)} change="+12.5% from last month" icon="💰" />
        <StatCard label="Orders" value={orders.length + 156} change="+8.2% from last month" icon="📦" />
        <StatCard label="Users" value={users.length + 1240} change="+5.1% from last month" icon="👥" />
        <StatCard label="Products" value={products.length} change="4 added this week" icon="🏷️" />
      </div>
      <div className="glass-card mt-8 p-6">
        <h2 className="text-lg font-bold">Revenue Overview</h2>
        <div className="mt-6 flex h-48 items-end gap-4">
          {chartData.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
                style={{ height: `${item.value}%` }}
              />
              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
