import { useState } from 'react';
import libraryBg from '../assets/library-bg.jpg';

const MAX = 50;

export default function Register({ onBack }) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  function handleRegister(event) {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setMessage('Registration will be connected to ASP.NET later.');
  }

  return (
    <main className="relative flex min-h-screen min-h-[100dvh] min-w-0 items-center justify-center bg-cover bg-center bg-no-repeat px-3 py-6 sm:px-6 sm:py-10"
      style={{ backgroundImage: `url(${libraryBg})` }}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <section aria-labelledby="register-heading" className="relative z-10 w-full max-w-md min-w-0 rounded-2xl bg-white/95 px-5 py-6 shadow-2xl backdrop-blur-md sm:px-8 sm:py-8">
        <div className="mb-6 text-center">
          <div aria-hidden="true" className="mx-auto mb-3 flex size-14 items-center justify-center rounded-xl bg-amber-900 text-3xl text-white sm:mb-4 sm:size-16">📚</div>
          <h1 id="register-heading" className="break-words text-2xl font-bold text-amber-950 sm:text-3xl">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Join the ELDNET School Book Marketplace</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="register-name" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
            <input id="register-name" type="text" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} required
              maxLength={MAX} autoComplete="name" placeholder="Enter your full name"
              className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
            <p className="mt-1 text-right text-xs text-gray-500">{form.fullName.length} / {MAX} characters</p>
          </div>
          <div className="mb-4">
            <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-gray-700">School Email</label>
            <input id="register-email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required
              maxLength={MAX} autoComplete="email" placeholder="Enter your school email"
              className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
            <p className="mt-1 text-right text-xs text-gray-500">{form.email.length} / {MAX} characters</p>
          </div>
          <div className="mb-4">
            <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative min-w-0">
              <input id="register-password" type={showPassword ? 'text' : 'password'} value={form.password}
                onChange={(e) => updateField('password', e.target.value)} maxLength={MAX} minLength={8}
                autoComplete="new-password" placeholder="Create a password" required
                className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 pr-20 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
              <button type="button" aria-pressed={showPassword} aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-1 min-h-11 cursor-pointer rounded-md px-3 text-sm font-semibold text-amber-900 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-amber-700">{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">{form.password.length} / {MAX} characters</p>
          </div>
          <div className="mb-6">
            <label htmlFor="register-confirm-password" className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative min-w-0">
              <input id="register-confirm-password" type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)}
                maxLength={MAX} minLength={8} autoComplete="new-password" placeholder="Confirm your password" required
                className="min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 pr-20 text-base outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200" />
              <button type="button" aria-pressed={showConfirmPassword} aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-1 min-h-11 cursor-pointer rounded-md px-3 text-sm font-semibold text-amber-900 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-amber-700">{showConfirmPassword ? 'Hide' : 'Show'}</button>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500">{form.confirmPassword.length} / {MAX} characters</p>
          </div>
          <button type="submit" className="min-h-12 w-full cursor-pointer rounded-lg bg-amber-900 py-3 font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900">Register</button>
        </form>
        {message && <p role="status" className="mt-4 break-words text-center text-sm text-amber-900">{message}</p>}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button type="button" onClick={onBack} className="min-h-11 cursor-pointer rounded-md px-3 py-2 font-semibold text-amber-900 hover:underline focus-visible:outline-2 focus-visible:outline-amber-900">Back to Login</button>
        </div>
      </section>
    </main>
  );
}