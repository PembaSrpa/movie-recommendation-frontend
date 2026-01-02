'use client';

import { useState } from 'react';
import { getRecommendations } from '@/lib/api';
import Link from 'next/link';
import { Scales } from '../scales';

export default function RecommendationsPage() {
  const [contentType, setContentType] = useState('movie');
  const [genres, setGenres] = useState([]);
  const [decade, setDecade] = useState('');
  const [mood, setMood] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Horror', 'Fantasy', 'Animation'];
  const decadeOptions = ['1980s', '1990s', '2000s', '2010s', '2020s'];
  const moodOptions = ['intense', 'light-hearted', 'thought-provoking', 'emotional', 'suspenseful'];

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
        top_n: 5
      });
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl h-full w-full mx-auto bg-neutral-100 dark:bg-neutral-900 relative">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Get Recommendations</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setContentType('movie')}
                    className={`px-4 py-2 rounded ${contentType === 'movie' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Movies
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentType('book')}
                    className={`px-4 py-2 rounded ${contentType === 'book' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  >
                    Books
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1 rounded text-sm ${genres.includes(genre) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decade
                </label>
                <select
                  value={decade}
                  onChange={(e) => setDecade(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Any</option>
                  {decadeOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Any</option>
                  {moodOptions.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Loading...' : 'Get Recommendations'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            {!results && (
              <p className="text-gray-500">Fill out the form to get recommendations</p>
            )}

            {results && (
              <div>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                    results.match_quality === 'high' ? 'bg-green-100 text-green-800' :
                    results.match_quality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {results.match_quality} match quality
                  </span>
                </div>

                <div className="space-y-4">
                  {results.recommendations.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <div className="text-sm text-gray-600 mb-2">
                        {item.genres?.join(', ')} • {item.release_year}
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        Rating: {item.vote_average}/10
                      </div>
                      <div className="text-sm text-blue-600">
                        {item.match_reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
