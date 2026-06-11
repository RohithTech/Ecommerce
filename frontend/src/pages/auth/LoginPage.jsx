import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(email, password);
    if (result.success) {
      const redirectTo = location.state?.from || "/";          
        navigate(redirectTo, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to your account</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-950">{error}</p>}
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" size="lg">Sign In</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
          Register
        </Link>
      </p>
      
    </>
  );
}
