export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex min-h-screen">
        <div className="hidden lg:block lg:w-1/5 p-8">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-3">Stats</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex justify-between">
                  <span>Movies</span>
                  <span className="font-semibold">500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Books</span>
                  <span className="font-semibold">45+</span>
                </div>
                <div className="flex justify-between">
                  <span>Characters</span>
                  <span className="font-semibold">12+</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-3">Features</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  ML-Powered
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Real-time
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Smart Matching
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/5 px-4 py-8">
          {children}
        </div>

        <div className="hidden lg:block lg:w-1/5 p-8">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-3">How it works</h3>
              <div className="space-y-3 text-white/80 text-sm">
                <div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">1</div>
                  <p>Select preferences</p>
                </div>
                <div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">2</div>
                  <p>AI analyzes data</p>
                </div>
                <div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2">3</div>
                  <p>Get personalized results</p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Made with</h3>
              <p className="text-sm opacity-90">Python • FastAPI • PostgreSQL • Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
