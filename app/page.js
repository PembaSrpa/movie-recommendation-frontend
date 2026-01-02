import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Movie & Book Recommendations
          </h1>
          <p className="text-xl text-gray-600">
            Powered by Machine Learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/recommendations">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Recommendations
              </h2>
              <p className="text-gray-600">
                Discover movies and books tailored to your preferences
              </p>
            </div>
          </Link>

          <Link href="/game">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Guessing Game
              </h2>
              <p className="text-gray-600">
                Think of a character and let me guess who it is
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-lg shadow px-6 py-3">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">500</span> Movies
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">45</span> Books
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">12</span> Characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
