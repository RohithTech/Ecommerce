import { users } from '../../data/users';
import Badge from '../../components/ui/Badge';

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="mt-1 text-slate-500">{users.length} registered users</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 font-semibold">Orders</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-slate-500">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.role === 'admin' ? 'sale' : 'default'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-slate-500">{user.joinDate}</td>
                <td className="px-4 py-3">{user.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
