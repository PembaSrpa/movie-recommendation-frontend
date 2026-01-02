'use client';

import { useState } from 'react';
import { startGame, answerQuestion, getCharacters } from '@/lib/api';
import Link from 'next/link';

export default function GamePage() {
  const [gameState, setGameState] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const chars = await getCharacters();
      const candidateIds = chars.characters.map(c => c.id);

      const data = await startGame();
      setGameState(data);
      setSessionData({ candidateIds });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start game');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    setLoading(true);
    try {
      const data = await answerQuestion({
        session_id: gameState.session_id,
        question_number: gameState.question_number,
        answer: answer,
        candidate_ids: sessionData.candidateIds
      });

      if (data.status === 'continue') {
        setGameState({
          session_id: gameState.session_id,
          question: data.question,
          options: data.options,
          question_number: data.question_number,
          remaining_candidates: data.remaining_candidates
        });
        setSessionData({ candidateIds: data.candidate_ids });
      } else {
        setGameState({ ...gameState, guesses: data.guesses, status: 'guess' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to answer question');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setGameState(null);
    setSessionData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Character Guessing Game</h1>

        {!gameState && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Think of a character (actor or anime character) and I&apos;ll try to guess who it is!
            </p>
            <button
              onClick={handleStart}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Starting...' : 'Start Game'}
            </button>
          </div>
        )}

        {gameState && gameState.status !== 'guess' && (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="mb-4 text-sm text-gray-500">
              Question {gameState.question_number} • {gameState.remaining_candidates || '?'} candidates remaining
            </div>

            <h2 className="text-2xl font-bold mb-6">{gameState.question}</h2>

            <div className="space-y-3">
              {Array.isArray(gameState.options) ? (
                gameState.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={loading}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-left px-4 py-3 rounded border border-blue-200 disabled:opacity-50"
                  >
                    {option}
                  </button>
                ))
              ) : (
                Object.keys(gameState.options).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={loading}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-left px-4 py-3 rounded border border-blue-200 disabled:opacity-50"
                  >
                    {option}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {gameState && gameState.status === 'guess' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">I think you&apos;re thinking of...</h2>

            <div className="space-y-4 mb-6">
              {gameState.guesses.map((guess, index) => (
                <div key={index} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{guess.name}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {guess.confidence}% confident
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {guess.type === 'actor' ? 'Actor' : 'Anime Character'} • {guess.source}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRestart}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
