'use client';

import { useState } from 'react';
import { getRecommendations } from '@/lib/api';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function RecommendationsPage() {
  const [contentType, setContentType] = useState('movie');
  const [genres, setGenres] = useState([]);
  const [decade, setDecade] = useState('');
  const [mood, setMood] = useState('');
  const [setting, setSetting] = useState('');
  const [minRating, setMinRating] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Horror', 'Fantasy', 'Animation', 'Mystery'];
  const decadeOptions = ['1980s', '1990s', '2000s', '2010s', '2020s'];
  const moodOptions = ['intense', 'light-hearted', 'thought-provoking', 'emotional', 'suspenseful'];
  const settingOptions = ['modern', 'historical', 'futuristic', 'fantasy_world'];

  const toggleGenre = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter(g => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getRecommendations({
        content_type: contentType,
        genres: genres.length > 0 ? genres : null,
        decade: decade || null,
        mood: mood || null,
        setting: setting || null,
        min_rating: minRating ? parseFloat(minRating) : null,
        top_n: 8
      });
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get recommendations. Check if API is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Link href="/" className="text-white/80 hover:text-white mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-white mb-8">Get Personalized Recommendations</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-white text-xl font-bold mb-6">Your Preferences</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Content Type
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setContentType('movie')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    contentType === 'movie'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Movies
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('book')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                    contentType === 'book'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Books
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Genres (select multiple)
              </label>
              <div className="flex flex-wrap gap-2">
                {genreOptions.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      genres.includes(genre)
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Decade
                </label>
                <select
                  value={decade}
                  onChange={(e) => setDecade(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Any</option>
                  {decadeOptions.map(d => (
                    <option key={d} value={d} className="bg-slate-800">{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Min Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  placeholder="0-10"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Mood
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any</option>
                {moodOptions.map(m => (
                  <option key={m} value={m} className="bg-slate-800">{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Setting
              </label>
              <select
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Any</option>
                {settingOptions.map(s => (
                  <option key={s} value={s} className="bg-slate-800 capitalize">{s.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Finding Recommendations...' : 'Get Recommendations'}
            </button>
          </form>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-white text-xl font-bold mb-6">Results</h2>

          {!results && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"></div>
              <p className="text-white/60">Fill out your preferences to get personalized recommendations</p>
            </div>
          )}

          {results && (
            <div>
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  results.match_quality === 'high' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  results.match_quality === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {results.match_quality.toUpperCase()} MATCH QUALITY
                </span>
              </div>

              <div className="space-y-4 max-h-150 overflow-y-auto pr-2">
                {results.recommendations.map((item, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <div className="bg-purple-600 px-2 py-1 rounded text-white text-xs font-semibold">
                        {item.vote_average || item.average_rating}/10
                      </div>
                    </div>
                    <div className="text-sm text-white/60 mb-2">
                      {item.genres?.join(', ')} • {item.release_year}
                    </div>
                    <div className="text-sm text-blue-300 mb-2">
                      {item.match_reason}
                    </div>
                    {item.overview && (
                      <p className="text-sm text-white/70 line-clamp-2">{item.overview || item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
