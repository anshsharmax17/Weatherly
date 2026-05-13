import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ mode }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authenticate(isLogin ? 'login' : 'register', form);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[75vh] w-[min(520px,calc(100%-24px))] items-center py-10">
      <form onSubmit={submit} className="glass w-full rounded-[2rem] p-8">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-500">{isLogin ? 'Welcome back' : 'Start now'}</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">{isLogin ? 'Sign in' : 'Create account'}</h1>
        {!isLogin && <input className="input mt-6" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="input mt-4" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input mt-4" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}</button>
        <p className="mt-5 text-center text-slate-600 dark:text-slate-300">{isLogin ? 'New here?' : 'Already have an account?'} <Link className="font-bold text-sky-500" to={isLogin ? '/register' : '/login'}>{isLogin ? 'Create account' : 'Login'}</Link></p>
      </form>
    </main>
  );
};

export default AuthPage;
