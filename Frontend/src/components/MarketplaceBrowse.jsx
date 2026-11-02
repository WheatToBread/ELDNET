import { useMemo, useState } from 'react';
import BookCard from './BookCard.jsx';
import { categories } from '../data/books.js';

const MAX = 50;
const priceOptions = [
  { value: 'all', label: 'All prices' },
  { value: 'under200', label: 'Under ₱200' },
  { value: '200to299', label: '₱200 – ₱299' },
  { value: '300plus', label: '₱300 and above' },
];
const conditions = ['All conditions', 'Like New', 'Good', 'Fair'];

export default function MarketplaceBrowse({
  visible,
  search, setSearch,
  category, setCategory,
  sort, setSort,
  saved, onlySaved, setOnlySaved,
  toggleSaved, setSelectedBook,
  notice,
}) {
  const [priceBand, setPriceBand] = useState('all');
  const [condition, setCondition] = useState('All conditions');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => visible.filter((book) => {
    if (condition !== 'All conditions' && book.condition !== condition) return false;
    if (priceBand === 'under200' && book.price >= 200) return false;
    if (priceBand === '200to299' && (book.price < 200 || book.price >= 300)) return false;
    if (priceBand === '300plus' && book.price < 300) return false;
    return true;
  }), [visible, priceBand, condition]);

  const activeFilters = category !== 'All books' || priceBand !== 'all' ||
    condition !== 'All conditions' || onlySaved || search.length > 0;

  function clearFilters() {
    setSearch('');
    setCategory('All books');
    setSort('featured');
    setOnlySaved(false);
    setPriceBand('all');
    setCondition('All conditions');
  }

  return (
    <section id="browse" className="scroll-mt-20 bg-white pb-14 text-[#252525] sm:scroll-mt-24 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 pt-8 sm:px-6 lg:px-8">
        {/* Simple bookstore heading, inspired by traditional shopping pages */}
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-gray-500">
          <a href="#top" className="cursor-pointer hover:text-red-700">Home</a>
          <span className="mx-2 text-gray-300">/</span>
          <span className="font-semibold text-gray-800">Books for Sale</span>
        </nav>
        <div className="border-b-2 border-[#1c1c1c] pb-5">
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Books for Sale</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Find affordable textbooks and secondhand reads from students on campus.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 pt-6 lg:grid-cols-[235px_minmax(0,1fr)] lg:gap-10">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button type="button" onClick={() => setFiltersOpen((x) => !x)}
              aria-expanded={filtersOpen} aria-controls="marketplace-filters"
              className="flex min-h-12 w-full cursor-pointer items-center justify-between border border-gray-300 px-4 py-3 text-sm font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-red-700">
              Shopping Options <span aria-hidden="true">{filtersOpen ? '−' : '+'}</span>
            </button>
          </div>

          {/* Classic store sidebar */}
          <aside id="marketplace-filters" className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="border-b border-gray-300 pb-3 text-sm font-black uppercase tracking-[.12em]">
              Shopping Options
            </div>

            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider">Subject</h3>
              <div className="space-y-1">
                {categories.map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`block w-full cursor-pointer border-l-2 px-3 py-2 text-left text-sm transition ${category === item ? 'border-red-700 bg-red-50 font-bold text-red-800' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <fieldset className="border-b border-gray-200 py-5">
              <legend className="pt-5 text-xs font-extrabold uppercase tracking-wider">Price</legend>
              <div className="mt-3 space-y-3">
                {priceOptions.map((opt) => (
                  <label key={opt.value} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                    <input type="radio" name="marketplace-price" value={opt.value}
                      checked={priceBand === opt.value} onChange={() => setPriceBand(opt.value)}
                      className="size-4 cursor-pointer accent-red-700" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="border-b border-gray-200 py-5">
              <legend className="pt-5 text-xs font-extrabold uppercase tracking-wider">Book Condition</legend>
              <div className="mt-3 space-y-3">
                {conditions.map((item) => (
                  <label key={item} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                    <input type="radio" name="marketplace-condition" value={item}
                      checked={condition === item} onChange={() => setCondition(item)}
                      className="size-4 cursor-pointer accent-red-700" />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="my-5 flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
              <input type="checkbox" checked={onlySaved}
                onChange={(e) => setOnlySaved(e.target.checked)}
                className="size-4 cursor-pointer accent-red-700" />
              Saved books only
            </label>
            {activeFilters && (
              <button type="button" onClick={clearFilters}
                className="cursor-pointer text-sm font-bold text-red-700 underline underline-offset-4 hover:text-red-900">
                Clear all filters
              </button>
            )}
          </aside>

          {/* Results, search, sort, and book grid */}
          <div className="min-w-0">
            <div className="flex min-w-0 flex-col items-start justify-between gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
              <p className="text-sm text-gray-600">
                <strong className="font-bold text-gray-900">{results.length}</strong> book{results.length === 1 ? '' : 's'} found
              </p>
              <label className="flex w-full cursor-pointer flex-wrap items-center justify-between gap-2 text-sm font-semibold sm:w-auto sm:justify-start">
                Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="min-h-11 max-w-full min-w-0 cursor-pointer border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-red-700 sm:max-w-48 sm:text-sm">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Title: A to Z</option>
                </select>
              </label>
            </div>

            <div className="relative mt-5">
              <span aria-hidden="true" className="pointer-events-none absolute left-4 top-3.5 text-gray-500">⌕</span>
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} maxLength={MAX}
                aria-label="Search titles, subjects, or sellers" placeholder="Search books, subjects, or sellers..."
                className="min-h-12 w-full min-w-0 rounded-none border border-gray-300 bg-[#fafafa] py-3 pl-10 pr-4 text-base outline-none transition focus:border-red-700 focus:bg-white sm:text-sm" />
              <p className="mt-1 text-right text-[11px] text-gray-500">{search.length}/{MAX} characters</p>
            </div>

            {notice && <p role="status" className="my-5 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-gray-800">{notice}</p>}

            {results.length > 0 ? (
              <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {results.map((book) => (
                  <BookCard key={book.id} book={book} favorite={saved.includes(book.id)}
                    onFavorite={toggleSaved} onView={setSelectedBook} />
                ))}
              </div>
            ) : (
              <div className="mt-5 border border-dashed border-gray-300 px-4 py-12 text-center sm:px-6 sm:py-16">
                <p className="text-3xl" aria-hidden="true">📚</p>
                <h3 className="mt-3 text-xl font-bold">No books match your filters</h3>
                <p className="mt-2 text-sm text-gray-500">Try another search, price range, or subject.</p>
                <button type="button" onClick={clearFilters}
                  className="mt-5 cursor-pointer bg-[#1c1c1c] px-6 py-3 text-sm font-bold text-white hover:bg-red-800">
                  Show All Books
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}