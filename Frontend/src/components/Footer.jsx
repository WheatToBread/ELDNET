export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 text-slate-500 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xl font-black tracking-tight text-slate-900">UniBook<span className="text-indigo-600">.</span> Exchange</p>
          <p className="mt-2 max-w-sm text-sm">Preloved textbooks. Better semesters. A student-to-student book marketplace.</p>
        </div>
        <div className="text-sm leading-7">
          <p>Marketplace frontend prototype</p>
          <p>Sample listings · no live purchases yet</p>
          <p>Arrange any exchanges in school-approved places</p>
        </div>
      </div>
    </footer>
  );
}
