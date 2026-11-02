import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import MarketplaceBrowse from '../components/MarketplaceBrowse.jsx';
import Footer from '../components/Footer.jsx';
import { categories, sampleBooks } from '../data/books.js';

const blankDraft = { title: '', price: '', subject: 'Engineering', condition: 'Good' };
const MAX = 50;

export default function Home({ user, onLogout }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All books');
  const [sort, setSort] = useState('featured');
  const [saved, setSaved] = useState([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSell, setShowSell] = useState(false);
  const [draft, setDraft] = useState(blankDraft);
  const [extraBooks, setExtraBooks] = useState([]);
  const [notice, setNotice] = useState('');

  const books = useMemo(() => [...extraBooks, ...sampleBooks], [extraBooks]);
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = books.filter(book =>
      (category === 'All books' || book.subject === category) &&
      (!onlySaved || saved.includes(book.id)) &&
      (!term || [book.title, book.seller, book.subject, book.edition].some(x => x.toLowerCase().includes(term)))
    );
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [books, category, search, sort, onlySaved, saved]);

  function toggleSaved(id) {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function postBook(event) {
    event.preventDefault();
    const price = Number(draft.price);
    if (!draft.title.trim() || !Number.isFinite(price) || price < 1 || price > 100000) {
      setNotice('Enter a book title and a valid price (₱1–₱100,000).');
      return;
    }
    setExtraBooks(prev => [{
      id: `demo-${Date.now()}`, title: draft.title.trim(), price,
      subject: draft.subject, condition: draft.condition, seller: user?.name || 'Student',
      location: 'Arrange on campus', edition: 'Student listing',
      note: 'Demo listing — not yet stored in a database.',
      color: '#DBEAFE', ink: '#1D4ED8', ribbon: '#A5B4FC',
    }, ...prev]);
    setDraft(blankDraft);
    setShowSell(false);
    setCategory('All books');
    setOnlySaved(false);
    setSearch('');
    setNotice('Your demo listing was added! It will disappear when you reload.');
    document.querySelector('#browse')?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (!selectedBook && !showSell) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedBook, showSell]);

  useEffect(() => {
    if (!selectedBook && !showSell) return;
    const onKey = event => {
      if (event.key === 'Escape') { setSelectedBook(null); setShowSell(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedBook, showSell]);

  return (
    <div id="top" className="min-h-screen min-w-0 bg-[#FAFAFD] text-slate-900">
      <Navbar
        user={user} onLogout={onLogout}
        savedCount={saved.length}
        onSaved={() => { setOnlySaved(v => !v); document.querySelector('#browse')?.scrollIntoView({ behavior: 'smooth' }); }}
        onPost={() => setShowSell(true)}
      />

      <main>
        {/* Modern bookstore hero */}
        <section className="relative overflow-hidden bg-[#EFF0FF]">
          <div className="mx-auto grid w-full max-w-7xl min-w-0 gap-6 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
            <div className="relative z-10 min-w-0">
              <h1 className="max-w-xl break-words font-serif text-[clamp(2.3rem,9vw,4.5rem)] font-bold leading-[1.06] tracking-tight text-slate-950">
                Good books.<br /><em className="font-serif text-indigo-600">Better prices.</em><br />New beginnings.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">Buy affordable secondhand textbooks, discover hidden gems, and give your old books a new home, all within your campus community.</p>
              <div className="mt-7 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap sm:mt-9">
                <a href="#browse" className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700">Explore Books &nbsp; ↗</a>
                <button type="button" onClick={() => setShowSell(true)} className="min-h-12 cursor-pointer rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-indigo-400 hover:text-indigo-600">Sell Your Books</button>
              </div>
            </div>
            <div aria-hidden="true" className="relative mx-auto hidden h-[260px] min-[400px]:flex w-full max-w-lg min-w-0 items-center justify-center min-[400px]:h-80 sm:h-[420px]">
              <div className="absolute inset-5 rounded-full bg-[#D9DCFF] blur-2xl" />
              <div className="absolute left-[10%] top-[17%] flex h-[67%] w-[38%] -rotate-12 flex-col justify-between rounded-r-lg border-l-[14px] border-[#6A4CA6] bg-[#B9A2EB] p-2 text-center sm:p-5 text-[#37256D] shadow-[16px_20px_26px_#3e41723d]"><span className="text-[10px] font-bold tracking-[0.2em]">UNIBOOK FINDS</span><strong className="font-serif text-base leading-tight min-[400px]:text-xl sm:text-3xl">Physics<br />&amp;<br />Beyond</strong><span className="text-xs">SCIENCE</span></div>
              <div className="absolute left-[33%] top-[8%] flex h-[78%] w-[39%] rotate-3 flex-col justify-between rounded-r-lg border-l-[14px] border-[#1F5D6C] bg-[#A1E4D6] p-2 text-center sm:p-5 text-[#164653] shadow-[16px_20px_28px_#3e41724d]"><span className="text-[10px] font-bold tracking-[0.2em]">CAMPUS EDITION</span><strong className="font-serif text-base leading-tight min-[400px]:text-xl sm:text-3xl">THE<br />ART OF<br />LEARNING</strong><span className="text-xs">STUDENT GUIDE</span></div>
              <div className="absolute left-[59%] top-[23%] flex h-[63%] w-[31%] rotate-12 flex-col justify-between rounded-r-lg border-l-[12px] border-[#D46C43] bg-[#FFCFAB] p-2 text-center sm:p-4 text-[#9E4928] shadow-[14px_19px_24px_#3e41723d]"><span className="text-[9px] font-bold tracking-widest">SECOND EDITION</span><strong className="font-serif text-base leading-snug sm:text-2xl">Creative<br />Minds</strong><span className="text-xs">BOOK CLUB</span></div>
              <span className="absolute bottom-0 right-1 -rotate-6 rounded-lg bg-white px-3 py-2 text-xs font-black text-indigo-700 shadow-lg sm:-bottom-2 sm:right-0 sm:px-5 sm:py-3 sm:text-sm">From ₱120 ✨</span>
            </div>
          </div>
        </section>

        {/* Subject categories */}
        <section className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">Explore by subject</h2>
              <a href="#browse" className="text-sm font-bold text-indigo-600 hover:underline">All books ↗</a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {categories.slice(1).map((name, i) => (
                <button key={name} type="button" onClick={() => { setCategory(name); document.querySelector('#browse')?.scrollIntoView({ behavior: 'smooth' }); }} className="min-h-28 min-w-0 cursor-pointer rounded-2xl border border-slate-100 p-3 text-left transition hover:border-indigo-200 hover:shadow-md motion-safe:hover:-translate-y-1 sm:p-4" style={{ backgroundColor: ['#F1F2FF','#FFF1E8','#EDF8F2','#FFF7DF','#F7F0FF','#EAF5FF'][i] }}>
                  <span className="block text-2xl" aria-hidden="true">{['⚙️','∑','⚗️','📖','📊','💻'][i]}</span>
                  <span className="mt-3 block break-words text-sm font-bold text-slate-800">{name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bookstore-style shopping section */}
        <MarketplaceBrowse
          visible={visible}
          search={search} setSearch={setSearch}
          category={category} setCategory={setCategory}
          sort={sort} setSort={setSort}
          saved={saved} onlySaved={onlySaved} setOnlySaved={setOnlySaved}
          toggleSaved={toggleSaved} setSelectedBook={setSelectedBook}
          notice={notice}
        />

        <section className="bg-[#171F3C] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto flex max-w-7xl min-w-0 flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300">Pass it on</p><h2 className="max-w-xl font-serif text-3xl font-bold sm:text-4xl">Your old textbook could be someone else's next great find.</h2><p className="mt-3 max-w-lg text-sm text-slate-300">Create a listing in minutes. The posting form is a frontend preview until our backend is ready.</p></div>
            <button type="button" onClick={() => setShowSell(true)} className="min-h-12 w-full cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-indigo-100 sm:w-auto">Post a Book ↗</button>
          </div>
        </section>
      </main>
      <Footer />

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-2 sm:p-4" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedBook(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="detail-title" className="max-h-[calc(100dvh-1rem)] w-full max-w-xl min-w-0 overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between gap-3"><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Book details</p><button type="button" onClick={() => setSelectedBook(null)} aria-label="Close details" className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg text-2xl text-slate-500 hover:text-slate-900">×</button></div>
            <h2 id="detail-title" className="mt-3 break-words font-serif text-2xl font-bold text-slate-950 sm:text-3xl">{selectedBook.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{selectedBook.subject} · {selectedBook.edition} · {selectedBook.condition} condition</p>
            <p className="mt-5 text-3xl font-black text-indigo-600">₱{selectedBook.price.toLocaleString('en-PH')}</p>
            <div className="mt-5 break-words rounded-2xl bg-slate-50 p-3 text-sm leading-7 text-slate-700 sm:p-5"><p><strong>Seller:</strong> {selectedBook.seller}</p><p><strong>Suggested meeting place:</strong> {selectedBook.location}</p><p className="mt-2">{selectedBook.note}</p></div>
            <p className="mt-5 text-sm text-slate-500">Contact and purchase requests will work when the ASP.NET backend is connected.</p>
            <button type="button" onClick={() => setSelectedBook(null)} className="mt-5 w-full cursor-pointer rounded-full bg-indigo-600 px-5 py-3 font-bold text-white">Back to books</button>
          </section>
        </div>
      )}

      {showSell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-2 sm:p-4" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setShowSell(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="sell-title" className="max-h-[calc(100dvh-1rem)] w-full max-w-lg min-w-0 overflow-y-auto overscroll-contain rounded-2xl bg-white p-4 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:p-8">
            <div className="flex justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Demo form</p><h2 id="sell-title" className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Sell a Book</h2></div><button type="button" aria-label="Close post form" onClick={() => setShowSell(false)} className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg text-2xl text-slate-500 hover:text-slate-900">×</button></div>
            <p className="mt-2 text-sm text-slate-500">Preview only: books you post are not saved after reload.</p>
            <form onSubmit={postBook} className="mt-6 min-w-0 space-y-4">
              <div><label htmlFor="sell-title-input" className="text-sm font-semibold">Book title</label><input id="sell-title-input" required maxLength={MAX} value={draft.title} onChange={e => setDraft(v => ({ ...v, title: e.target.value }))} placeholder="e.g. Engineering Mechanics" className="mt-1 min-h-12 w-full min-w-0 rounded-xl border border-slate-200 p-3 text-base outline-none focus:border-indigo-500" /><p className="mt-1 text-right text-xs text-slate-400">{draft.title.length}/{MAX} characters</p></div>
              <div><label htmlFor="sell-price" className="text-sm font-semibold">Price (₱)</label><input id="sell-price" required type="text" inputMode="decimal" maxLength={MAX} value={draft.price} onChange={e => setDraft(v => ({ ...v, price: e.target.value }))} placeholder="e.g. 250" className="mt-1 min-h-12 w-full min-w-0 rounded-xl border border-slate-200 p-3 text-base outline-none focus:border-indigo-500" /></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="text-sm font-semibold">Subject<select value={draft.subject} onChange={e => setDraft(v => ({ ...v, subject: e.target.value }))} className="mt-1 min-h-12 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 p-3 text-base font-normal">{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label><label className="text-sm font-semibold">Condition<select value={draft.condition} onChange={e => setDraft(v => ({ ...v, condition: e.target.value }))} className="mt-1 min-h-12 w-full min-w-0 cursor-pointer rounded-xl border border-slate-200 p-3 text-base font-normal"><option>Like New</option><option>Good</option><option>Fair</option></select></label></div>
              <button type="submit" className="min-h-12 w-full cursor-pointer rounded-full bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700">Add Demo Listing</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}