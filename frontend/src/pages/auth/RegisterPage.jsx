import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Required';
    if (!form.email.trim()) newErrors.email = 'Required';
    if (form.password.length < 6) newErrors.password = 'Min 6 characters';
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ email: result.error });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">Join us for exclusive deals</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} required />
        <Input label="Confirm Password" name="confirm" type="password" value={form.confirm} onChange={handleChange} error={errors.confirm} required />
        <Button type="submit" className="w-full" size="lg">Create Account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
          Sign In
        </Link>
      </p>
    </>
  );
}
