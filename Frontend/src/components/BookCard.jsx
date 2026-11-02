export default function BookCard({ book, favorite, onFavorite, onView }) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1">
      <div className="relative flex h-52 min-w-0 items-center justify-center overflow-hidden bg-[#f2f3f8] p-4 sm:h-60 sm:p-5">
        <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-700 shadow-sm" title={book.condition}>{book.condition}</span>
        <button type="button" onClick={() => onFavorite(book.id)}
          aria-label={favorite ? `Remove ${book.title} from saved books` : `Save ${book.title}`}
          aria-pressed={favorite}
          className={`absolute right-2 top-2 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-white text-2xl shadow-sm transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-indigo-600 ${favorite ? 'text-rose-500' : 'text-slate-500'}`}>
          <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
        </button>
        <div className="relative flex h-40 w-28 max-w-[75%] rotate-[-4deg] flex-col justify-between rounded-sm border-l-[8px] p-3 text-center shadow-[12px_12px_16px_#1824443b] transition-transform duration-300 group-hover:rotate-0 sm:h-48 sm:w-36"
          style={{ backgroundColor: book.color, color: book.ink, borderLeftColor: book.ink }}>
          <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-80">UniBook Collection</span>
          <span className="line-clamp-4 break-words font-serif text-base font-black leading-tight sm:text-lg">{book.title}</span>
          <span className="truncate border-t pt-2 text-[9px] font-bold uppercase tracking-wider" style={{ borderColor: book.ink }}>{book.edition}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="mb-2 break-words text-xs font-bold uppercase tracking-[0.1em] text-indigo-600">{book.subject}</p>
        <h3 className="line-clamp-2 break-words text-base font-bold leading-6 text-slate-900 sm:text-lg">{book.title}</h3>
        <p className="mt-2 line-clamp-2 break-words text-xs text-slate-500">Listed by {book.seller}</p>
        <div className="mt-auto flex min-w-0 flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <strong className="break-words text-xl font-extrabold tracking-tight text-slate-900">₱{Number(book.price).toLocaleString('en-PH')}</strong>
          <button type="button" onClick={() => onView(book)} className="min-h-11 w-full cursor-pointer rounded-full border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus-visible:outline-2 focus-visible:outline-indigo-600 sm:w-auto">View Details ↗</button>
        </div>
      </div>
    </article>
  );
}