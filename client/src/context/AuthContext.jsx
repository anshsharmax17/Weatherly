import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('weatherly_token'));
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.data.user);
      } catch {
        localStorage.removeItem('weatherly_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [token]);

  const authenticate = async (endpoint, payload) => {
    const { data } = await api.post(`/auth/${endpoint}`, payload);
    localStorage.setItem('weatherly_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
    toast.success(data.message);
  };

  const logout = () => {
    localStorage.removeItem('weatherly_token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = useMemo(() => ({ user, token, loading, isAuthenticated: Boolean(token), authenticate, logout, setUser }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
