import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className="mx-auto w-7xl px-4 py-6 sm:px-6  lg:px-8">
<div className="  mx-auto max-w-2xl rounded-3xl bg-slate-900 border border-slate-800  p-8 text-center shadow-2xl"> 
         <h2 className="text-2xl font-bold text-white sm:text-3xl">Stay in the Loop</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Subscribe for exclusive deals, new arrivals, and style tips.
        </p>
        {subscribed ? (
          <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Thanks for subscribing! Check your inbox for a welcome offer.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-slate-900 "
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
