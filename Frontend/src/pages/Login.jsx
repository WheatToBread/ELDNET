import { useState } from 'react';
import libraryBg from '../assets/library-bg.jpg';

const MAX = 50;

export default function Login({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  function handleLogin(event) {
    event.preventDefault();
    setMessage('Login will be connected to ASP.NET later.');
  }

  return (
    <main className="relative flex min-h-screen min-h-[100dvh] min-w-0 items-center justify-center bg-cover bg-center bg-no-repeat px-3 py-6 sm:px-6 sm:py-10"
      style={{ backgroundImage: `url(${libraryBg})` }}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <section aria-labelledby="login-heading" className="relative z-10 w-full max-w-md min-w-0 rounded-2xl bg-white/95 px-5 py-6 shadow-2xl backdrop-blur-md sm:px-8 sm:py-8">
        <div className="mb-6 text-center sm:mb-8">
          <div aria-hidden="true" className="mx-auto mb-3 flex size-14 items-center justify-center rounded-xl bg-amber-900 text-3xl text-white sm:mb-4 sm:size-16">📚</div>
          <h1 className="break-words text-3xl font-bold text-amber-950 sm:text-4xl">ELDNET</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">School Book Marketplace</p>
        </div>
        <h2 id="login-heading" className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">Welcome Back!</h2>
        <p className="mb-6 text-sm leading-6 text-gray-600 sm:text-base">Sign in to explore your book marketplace.</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-700">School Email</label>
            <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              maxLength={MAX} autoComplete="email" required placeholder="Enter your school email"
              className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
            <p className="mt-1 text-right text-xs text-gray-500">{email.length} / {MAX} characters</p>
          </div>
          <div className="mb-6">
            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative min-w-0">
              <input id="login-password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)} maxLength={MAX}
                autoComplete="current-password" required placeholder="Enter your password"
                className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 pr-20 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
              <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword} onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-1 min-h-11 cursor-pointer rounded-md px-3 text-sm font-semibold text-amber-900 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-amber-700">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">{password.length} / {MAX} characters</p>
          </div>
          <button type="submit" className="min-h-12 w-full cursor-pointer rounded-lg bg-amber-900 py-3 font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900">Login</button>
        </form>
        {message && <p role="status" className="mt-4 break-words text-center text-sm text-amber-900">{message}</p>}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-600">Don't have an account yet?</p>
          <button type="button" onClick={onRegister} className="min-h-12 w-full cursor-pointer rounded-lg border-2 border-amber-900 px-3 py-3 font-semibold text-amber-900 transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900">Create an Account</button>
        </div>
      </section>
    </main>
  );
}