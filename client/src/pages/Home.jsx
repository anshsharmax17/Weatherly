import { ArrowRight, CloudLightning, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => (
  <main className="mx-auto grid w-[min(1120px,calc(100%-24px))] gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
    <section>
      <div className="mb-5 inline-flex rounded-full border border-white/40 bg-white/50 px-4 py-2 text-sm font-bold text-sky-700 dark:bg-white/10 dark:text-sky-200">Professional MERN SaaS Weather Dashboard</div>
      <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-white md:text-7xl">Forecasts that feel fast, personal, and beautiful.</h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-700 dark:text-slate-300">Weatherly combines OpenWeatherMap data, JWT accounts, favorite cities, recent searches, geolocation, and Chart.js analytics in a glassmorphism PWA.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/register">Create free account <ArrowRight className="inline" /></Link>
      </div>
    </section>
    <section className="glass relative overflow-hidden rounded-[2.5rem] p-8">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sky-400/40 blur-3xl" />
      <CloudLightning className="h-24 w-24 animate-float text-yellow-300" />
      <p className="mt-12 text-sm font-bold uppercase tracking-[0.3em] text-sky-500">Live preview</p>
      <h2 className="mt-3 text-6xl font-black text-slate-950 dark:text-white">24°C</h2>
      <p className="text-xl text-slate-600 dark:text-slate-300">Partly cloudy in Bengaluru</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[['Secure', ShieldCheck], ['Animated', Sparkles], ['Geo-ready', MapPinned]].map(([label, Icon]) => <div key={label} className="rounded-3xl bg-white/60 p-4 dark:bg-white/10"><Icon className="text-sky-500" /><p className="mt-3 font-bold text-slate-900 dark:text-white">{label}</p></div>)}
      </div>
    </section>
  </main>
);

export default Home;
