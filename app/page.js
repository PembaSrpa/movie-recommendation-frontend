import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Movie & Book<br/>Recommendations
        </h1>
        <p className="text-xl text-white/80">
          Powered by Machine Learning
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Link href="/recommendations">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition cursor-pointer border border-white/20 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Get Recommendations
            </h2>
            <p className="text-white/70">
              Discover movies and books tailored to your preferences using AI
            </p>
          </div>
        </Link>

        <Link href="/game">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition cursor-pointer border border-white/20 group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Guessing Game
            </h2>
            <p className="text-white/70">
              Think of a character and let our AI guess who it is
            </p>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/browse/movies">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition cursor-pointer border border-white/10">
            <h3 className="text-white font-semibold mb-2">Browse Movies</h3>
            <p className="text-white/60 text-sm">Explore 500+ movies</p>
          </div>
        </Link>

        <Link href="/browse/books">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition cursor-pointer border border-white/10">
            <h3 className="text-white font-semibold mb-2">Browse Books</h3>
            <p className="text-white/60 text-sm">Discover 45+ books</p>
          </div>
        </Link>

        <Link href="/trending">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition cursor-pointer border border-white/10">
            <h3 className="text-white font-semibold mb-2">Trending Now</h3>
            <p className="text-white/60 text-sm">See what&apos;s popular</p>
          </div>
        </Link>
      </div>
    </PageLayout>
  );
}
