export default function BookCard({ book, favorite, onFavorite, onView }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#f2f3f8] p-5 sm:h-60">
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-700 shadow-sm">{book.condition}</div>
        <button type="button" onClick={() => onFavorite(book.id)} aria-label={favorite ? `Remove ${book.title} from saved books` : `Save ${book.title}`} aria-pressed={favorite} className={`absolute right-3 top-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-white text-xl shadow-sm hover:scale-105 ${favorite ? 'text-rose-500' : 'text-slate-500'}`}>
          {favorite ? '♥' : '♡'}
        </button>
        <div className="relative flex h-44 w-32 rotate-[-5deg] flex-col justify-between rounded-sm border-l-[9px] p-3 text-center shadow-[12px_12px_16px_#1824443b] transition duration-300 group-hover:rotate-0 sm:h-48 sm:w-36" style={{ backgroundColor: book.color, color: book.ink, borderLeftColor: book.ink }}>
          <span className="text-[9px] font-black uppercase tracking-[0.16em] opacity-80">UniBook Collection</span>
          <span className="font-serif text-base font-black leading-snug sm:text-lg">{book.title}</span>
          <span className="border-t pt-2 text-[9px] font-bold uppercase tracking-widest" style={{ borderColor: book.ink }}>{book.edition}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">{book.subject}</p>
        <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900 sm:text-lg">{book.title}</h3>
        <p className="mt-2 text-xs text-slate-500">Listed by {book.seller}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <strong className="text-xl font-extrabold tracking-tight text-slate-900">₱{book.price.toLocaleString('en-PH')}</strong>
          <button type="button" onClick={() => onView(book)} className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white">View Details ↗</button>
        </div>
      </div>
    </article>
  );
}
