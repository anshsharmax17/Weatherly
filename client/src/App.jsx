import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useWeather } from './context/WeatherContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import { weatherBackground } from './utils/weather';

const App = () => {
  const { current } = useWeather();
  return (
    <div className={`min-h-screen overflow-hidden bg-gradient-to-br ${weatherBackground(current?.condition)} transition-colors duration-700`}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,.35),transparent_30%)]" />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '16px' } }} />
    </div>
  );
};

export default App;
