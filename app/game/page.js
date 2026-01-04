'use client';

import { useState } from 'react';
import { startGame, answerQuestion, getCharacters } from '@/lib/api';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';

export default function GamePage() {
  const [gameState, setGameState] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);

  const handleStart = async () => {
    setLoading(true);
    setQuestionHistory([]);
    try {
      const chars = await getCharacters();
      const candidateIds = chars.characters.map(c => c.id);

      const data = await startGame();
      setGameState(data);
      setSessionData({ candidateIds });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start game. Check if API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    setLoading(true);

    setQuestionHistory([...questionHistory, {
      question: gameState.question,
      answer: answer
    }]);

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
        setGameState({ ...gameState, guesses: data.guesses, status: 'guess', total_questions: data.total_questions });
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
    setQuestionHistory([]);
  };

  return (
    <PageLayout>
      <Link href="/" className="text-white/80 hover:text-white mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-white mb-8">Character Guessing Game</h1>

      {!gameState && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center border border-white/20">
          <div className="text-7xl mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Think of a Character
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">
            Think of any actor or anime character, and I&apos;ll try to guess who it is by asking you questions!
          </p>
          <button
            onClick={handleStart}
            disabled={loading}
            className="bg-linear-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {loading ? 'Starting Game...' : 'Start Game'}
          </button>
        </div>
      )}

      {gameState && gameState.status !== 'guess' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <div className="text-white/60 text-sm">
                  Question <span className="text-white font-bold text-lg">{gameState.question_number}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-8">{gameState.question}</h2>

              <div className="space-y-3">
                {Array.isArray(gameState.options) ? (
                  gameState.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={loading}
                      className="w-full bg-white/5 hover:bg-white/15 text-left px-6 py-4 rounded-xl border border-white/20 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition group"
                    >
                      <span className="text-white font-medium group-hover:text-purple-300 transition">{option}</span>
                    </button>
                  ))
                ) : (
                  Object.keys(gameState.options).map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={loading}
                      className="w-full bg-white/5 hover:bg-white/15 text-left px-6 py-4 rounded-xl border border-white/20 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition group"
                    >
                      <span className="text-white font-medium group-hover:text-purple-300 transition">{option}</span>
                    </button>
                  ))
                )}
              </div>

              {loading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-white/60 mt-2">Analyzing your answer...</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4">Question History</h3>
            <div className="space-y-3 max-h-125 overflow-y-auto pr-2">
              {questionHistory.length === 0 ? (
                <p className="text-white/50 text-sm">Your answers will appear here</p>
              ) : (
                questionHistory.map((item, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-white/60 text-xs mb-1">Q{index + 1}</div>
                    <div className="text-white text-sm font-medium mb-1">{item.question}</div>
                    <div className="text-purple-300 text-sm">→ {item.answer}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {gameState && gameState.status === 'guess' && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-3xl font-bold text-white mb-2">I&apos;ve got it!</h2>
            <p className="text-white/70">After {gameState.total_questions} questions, you&apos;re thinking of...</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {gameState.guesses.map((guess, index) => (
              <div key={index} className={`bg-white/5 rounded-xl p-6 border-2 transition ${
                index === 0
                  ? 'border-yellow-500/50 bg-yellow-500/10'
                  : 'border-white/10 hover:border-white/30'
              }`}>
                {index === 0 && (
                  <div className="text-yellow-400 text-xs font-bold mb-2">TOP GUESS</div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-white text-lg">{guess.name}</h3>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    guess.confidence >= 80
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : guess.confidence >= 60
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {guess.confidence}%
                  </div>
                </div>
                <div className="text-sm text-white/60 mb-2">
                  {guess.type === 'actor' ? ' Actor' : ' Anime Character'}
                </div>
                <div className="text-sm text-white/70">
                  {guess.source}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <h3 className="text-white font-semibold mb-3">Your Journey:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {questionHistory.map((item, index) => (
                <div key={index} className="text-white/60">
                  <span className="text-white font-medium">Q{index + 1}:</span> {item.answer}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}
    </PageLayout>
  );
}
