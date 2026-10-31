import { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Optional Codespaces .env: VITE_API_BASE_URL=https://your-backend-domain
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // Development-only visual preview; never accessible from production builds.
  const devPreview = import.meta.env.DEV &&
    ['store', 'pinboard'].includes(new URLSearchParams(window.location.search).get('preview'));

  useEffect(() => {
    if (devPreview) { setChecking(false); return; }
    const controller = new AbortController();
    async function checkSession() {
      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: 'include', signal: controller.signal,
        });
        if (!response.ok) throw new Error('Not authenticated');
        const student = await response.json();
        if (!controller.signal.aborted) setUser(student);
      } catch (error) {
        if (error.name !== 'AbortError' && !controller.signal.aborted) setUser(null);
      } finally {
        if (!controller.signal.aborted) setChecking(false);
      }
    }
    checkSession();
    return () => controller.abort();
  }, [devPreview]);

  async function logout() {
    if (devPreview) { window.location.assign('/'); return; }
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST', credentials: 'include',
      });
    } catch {
      // Network failure: hide protected UI but server should revoke session too.
    } finally { setUser(null); setPage('login'); }
  }

  if (devPreview) return <Home user={{ name: 'Preview Student' }} onLogout={logout} />;
  if (checking) return <div role="status" className="grid min-h-screen place-items-center bg-slate-50 font-semibold text-slate-700">Checking your session…</div>;
  if (!user && page === 'register') return <Register onBack={() => setPage('login')} />;

  return (
    <ProtectedRoute isAuthenticated={Boolean(user)} fallback={<Login onRegister={() => setPage('register')} />}>
      <Home user={user} onLogout={logout} />
    </ProtectedRoute>
  );
}
