import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-4xl h-full w-full mx-auto bg-neutral-100 dark:bg-neutral-900 relative">
        <div className="absolute right-0 top-0 h-full w-8 border-x border-(--pattern-fg)
    bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
    bg-size-[10px_10px] bg-fixed">
</div>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Movie & Book Recommendations
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/recommendations">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer">
              <div className="text-4xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Recommendations
              </h2>
              <p className="text-gray-600">
                Discover movies and books
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
                Think of a character
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
