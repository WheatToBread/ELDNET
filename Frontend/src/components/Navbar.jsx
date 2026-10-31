export default function Navbar({ user, onPost, onLogout, savedCount = 0, onSaved }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-slate-900 no-underline">
          <span className="grid size-11 place-items-center rounded-xl bg-indigo-600 text-2xl text-white shadow-sm" aria-hidden="true">✦</span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight sm:text-xl">UniBook<span className="text-indigo-600">.</span></span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Exchange</span>
          </span>
        </a>
        <nav aria-label="Marketplace navigation" className="flex flex-wrap items-center gap-2 sm:gap-4">
          <a href="#browse" className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600">Browse Books</a>
          <button type="button" onClick={onSaved} className="cursor-pointer rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600">♡ Saved <span className="text-xs text-indigo-600">{savedCount}</span></button>
          <button type="button" onClick={onPost} className="cursor-pointer rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700">+ Sell a Book</button>
          <div className="hidden border-l border-slate-200 pl-4 text-right md:block">
            <p className="max-w-28 truncate text-xs font-semibold text-slate-800">{user?.name || 'Student'}</p>
            <button onClick={onLogout} type="button" className="cursor-pointer text-xs text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-indigo-600">Log out</button>
          </div>
          <button onClick={onLogout} type="button" className="cursor-pointer text-xs font-medium text-slate-500 underline underline-offset-4 md:hidden">Log out</button>
        </nav>
      </div>
    </header>
  );
}
