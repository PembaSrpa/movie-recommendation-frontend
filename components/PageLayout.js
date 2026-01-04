export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="w-3/5 mx-auto lg:w-3/5 px-4 py-8">
          {children}
        </div>
    </div>
  );
}
