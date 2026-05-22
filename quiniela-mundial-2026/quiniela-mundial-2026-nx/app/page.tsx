'use client';

import { useState, useEffect } from 'react';
import { Match } from '@/data/matches';
import { Prediction, getMatches, getPredictions, buildLeaderboard, LeaderboardEntry } from '@/lib/store';

interface PlayerPredictionProps {
  matches: Match[];
  predictions: Record<string, Prediction>;
  onSave: (pred: Prediction) => void;
}

function PredictionForm({ matches, predictions, onSave }: PlayerPredictionProps) {
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [localPreds, setLocalPreds] = useState<Record<number, [number, number]>>({});
  const [submitted, setSubmitted] = useState(false);

  const groupMatches = matches.filter((m) => m.phase === 'group');
  const existing = predictions[playerId];

  useEffect(() => {
    if (existing) {
      setLocalPreds(existing.predictions);
      setPlayerName(existing.playerName);
      setSubmitted(true);
    }
  }, [existing]);

  const handlePred = (matchId: number, team: 1 | 2, value: number) => {
    setLocalPreds((prev) => {
      const current: [number, number] = (prev[matchId] || [0, 0]) as [number, number];
      const updated: [number, number] = team === 1
        ? [value, current[1]]
        : [current[0], value];
      return { ...prev, [matchId]: updated };
    });
  };

  const handleSubmit = () => {
    if (!playerName.trim()) {
      alert('Pon tu nombre para participar');
      return;
    }
    const pred: Prediction = {
      playerId: playerId || playerName.toLowerCase().replace(/\s+/g, '-'),
      playerName: playerName.trim(),
      predictions: localPreds,
      submittedAt: new Date().toISOString(),
    };
    onSave(pred);
    setPlayerId(pred.playerId);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Tu nombre"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border border-gray-700 rounded px-3 py-2 bg-gray-800 text-white w-48"
          disabled={submitted}
        />
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Enviar quiniela
          </button>
        )}
        {submitted && (
          <span className="text-green-400 font-bold">✓ Quiniela enviada</span>
        )}
      </div>

      <div className="space-y-4">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((group) => {
          const gMatches = groupMatches.filter((m) => m.group === group);
          if (!gMatches.length) return null;
          return (
            <div key={group} className="border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">Grupo {group}</h3>
              <div className="space-y-2">
                {gMatches.map((m) => {
                  const pred = localPreds[m.id] || [0, 0];
                  const isPlayed = m.played;
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 text-sm bg-gray-800 rounded px-3 py-2"
                    >
                      <span className="w-6 text-gray-500">{m.id}</span>
                      <span className="w-28 font-medium">{m.team1}</span>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={pred[0] || ''}
                        onChange={(e) => handlePred(m.id, 1, parseInt(e.target.value) || 0)}
                        disabled={isPlayed}
                        className="w-12 text-center border border-gray-600 rounded bg-gray-700 text-white"
                        placeholder="0"
                      />
                      <span className="text-gray-400">vs</span>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={pred[1] || ''}
                        onChange={(e) => handlePred(m.id, 2, parseInt(e.target.value) || 0)}
                        disabled={isPlayed}
                        className="w-12 text-center border border-gray-600 rounded bg-gray-700 text-white"
                        placeholder="0"
                      />
                      <span className="font-medium">{m.team2}</span>
                      {isPlayed && (
                        <span className="ml-auto text-gray-400">
                          {m.score1}–{m.score2}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="py-2 px-3 text-gray-400">#</th>
            <th className="py-2 px-3 text-gray-400">Jugador</th>
            <th className="py-2 px-3 text-gray-400 text-center">Pts</th>
            <th className="py-2 px-3 text-gray-400 text-center">3pts</th>
            <th className="py-2 px-3 text-gray-400 text-center">1pt</th>
            <th className="py-2 px-3 text-gray-400 text-center">0pt</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e.playerId} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="py-2 px-3 text-gray-500">{i + 1}</td>
              <td className="py-2 px-3 font-medium text-white">{e.playerName}</td>
              <td className="py-2 px-3 text-center font-bold text-yellow-400">{e.totalPoints}</td>
              <td className="py-2 px-3 text-center text-green-400">{e.exactScores}</td>
              <td className="py-2 px-3 text-center text-blue-400">{e.correctResults}</td>
              <td className="py-2 px-3 text-center text-red-400">{e.wrongPredictions}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No hay predicciones aún
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'quiniela' | 'leaderboard'>('quiniela');

  const refresh = async () => {
    const [m, p] = await Promise.all([getMatches(), getPredictions()]);
    setMatches(m);
    setPredictions(p);
    setLeaderboard(buildLeaderboard(m, p));
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = async (pred: Prediction) => {
    const { savePrediction } = await import('@/lib/store');
    await savePrediction(pred);
    await refresh();
  };

  const playedCount = matches.filter((m) => m.played).length;
  const totalMatches = matches.length;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 max-w-5xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">🏆 Quiniela Mundial 2026</h1>
          <p className="text-gray-400 text-sm mt-1">
            {playedCount}/{totalMatches} partidos jugados · actualiza cada 10s
          </p>
        </div>
        <a
          href="/admin"
          className="text-xs text-gray-500 hover:text-gray-300 underline"
        >
          Admin
        </a>
      </header>

      <div className="flex gap-1 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('quiniela')}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === 'quiniela' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Mi Quiniela
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === 'leaderboard' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:text-white'
          }`}
        >
          Leaderboard
        </button>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Cargando datos...
        </div>
      ) : (
        <>
          {activeTab === 'quiniela' && (
            <PredictionForm
              matches={matches}
              predictions={predictions}
              onSave={handleSave}
            />
          )}
          {activeTab === 'leaderboard' && (
            <LeaderboardTable entries={leaderboard} />
          )}
        </>
      )}
    </main>
  );
}