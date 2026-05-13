import { CloudSun, Heart, Home, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navClass = ({ isActive }) => `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white text-sky-700 shadow-lg' : 'text-slate-700 hover:bg-white/60 dark:text-slate-200 dark:hover:bg-white/10'}`;

  return (
    <header className="sticky top-4 z-30 mx-auto w-[min(1120px,calc(100%-24px))]">
      <nav className="glass flex flex-wrap items-center justify-between gap-3 rounded-3xl px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-xl font-extrabold text-slate-950 dark:text-white">
          <span className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-2 text-white"><CloudSun /></span>
          Weatherly
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navClass}><Home size={16} /> Home</NavLink>
          {isAuthenticated && <NavLink to="/dashboard" className={navClass}><LayoutDashboard size={16} /> Dashboard</NavLink>}
          {isAuthenticated && <NavLink to="/favorites" className={navClass}><Heart size={16} /> Favorites</NavLink>}
          {!isAuthenticated ? <Link className="btn-primary" to="/login">Sign in</Link> : <button onClick={logout} className="flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2 font-semibold text-white"><LogOut size={16} /> Logout</button>}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
