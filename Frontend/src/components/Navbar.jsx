import { useEffect, useState } from 'react';

export default function Navbar({ user, onPost, onLogout, savedCount = 0, onSaved }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" onClick={closeMenu}
          className="flex min-w-0 items-center gap-2.5 rounded-lg text-slate-900 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <span className="min-w-0 leading-tight">
            <span className="block text-lg font-black tracking-tight sm:text-xl">UniBook<span className="text-indigo-600">.</span></span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Exchange</span>
          </span>
        </a>

        {/* On phones and small tablets, use a menu instead of squeezing the navigation. */}
        <button type="button" aria-controls="unibook-mobile-nav" aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border border-slate-200 px-3 text-xl font-bold text-slate-800 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:hidden">
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        <nav aria-label="Marketplace navigation" className="hidden items-center gap-2 lg:flex">
          <a href="#browse" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600">Browse Books</a>
          <button type="button" onClick={onSaved} className="min-h-11 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600">♡ Saved ({savedCount})</button>
          <button type="button" onClick={onPost} className="min-h-11 cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Sell a Book</button>
          <div className="ml-2 min-w-0 border-l border-slate-200 pl-4 text-right">
            <p className="max-w-32 truncate text-xs font-semibold text-slate-800" title={user?.name || 'Student'}>{user?.name || 'Student'}</p>
            <button onClick={onLogout} type="button" className="min-h-8 cursor-pointer text-xs text-slate-500 underline underline-offset-4 hover:text-indigo-600">Log out</button>
          </div>
        </nav>
      </div>

      <nav id="unibook-mobile-nav" aria-label="Mobile marketplace navigation"
        className={`${menuOpen ? 'block' : 'hidden'} border-t border-slate-200 bg-white px-4 pb-4 pt-2 shadow-md sm:px-6 lg:hidden`}>
          <p className="truncate px-2 py-2 text-sm font-medium text-slate-500">Signed in as {user?.name || 'Student'}</p>
          <a href="#browse" onClick={closeMenu} className="block min-h-11 rounded-lg px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-indigo-50">Browse Books</a>
          <button type="button" onClick={() => { closeMenu(); onSaved?.(); }} className="block min-h-11 w-full cursor-pointer rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-indigo-50">♡ Saved ({savedCount})</button>
          <button type="button" onClick={() => { closeMenu(); onPost?.(); }} className="mt-2 block min-h-11 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-3 text-left text-sm font-bold text-white hover:bg-indigo-700">+ Sell a Book</button>
          <button type="button" onClick={() => { closeMenu(); onLogout?.(); }} className="mt-2 block min-h-11 w-full cursor-pointer rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">Log out</button>
      </nav>
    </header>
  );
}