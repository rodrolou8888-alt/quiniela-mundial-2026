'use client';

import { useState, useEffect } from 'react';
import { Match } from '@/data/matches';
import { getMatches, saveMatches } from '@/lib/store';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'mundial2026';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth');
    if (stored === 'true') setAuthenticated(true);
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const m = await getMatches();
    setMatches(m.length ? m : []);
    setLoading(false);
  };

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setMsg('Contraseña incorrecta');
    }
  };

  const handleScore = (matchId: number, team: 1 | 2, value: number) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        return team === 1
          ? { ...m, score1: value }
          : { ...m, score2: value };
      })
    );
  };

  const handlePlayed = (matchId: number) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, played: !m.played } : m))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      await saveMatches(matches);
      setMsg('✓ Guardado');
    } catch {
      setMsg('Error al guardar');
    }
    setSaving(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 w-80 space-y-4">
          <h1 className="text-xl font-bold text-yellow-400 text-center">🔒 Admin</h1>
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 rounded"
          >
            Entrar
          </button>
          {msg && <p className="text-red-400 text-sm text-center">{msg}</p>}
          <a href="/" className="block text-center text-gray-500 text-sm hover:underline mt-2">
            ← Volver
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  const groupMatches = matches.filter((m) => m.phase === 'group');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">⚙️ Admin — Resultados</h1>
          <p className="text-gray-400 text-sm">Actualizá los marcadores conforme se juegan</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <a href="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-6 py-2 rounded">
            Ver Quiniela
          </a>
        </div>
      </header>

      {msg && (
        <div className={`mb-4 px-4 py-2 rounded text-sm font-bold ${msg.startsWith('✓') ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
          {msg}
        </div>
      )}

      <div className="space-y-6">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((group) => {
          const gMatches = groupMatches.filter((m) => m.group === group);
          if (!gMatches.length) return null;
          const played = gMatches.filter((m) => m.played).length;
          return (
            <div key={group} className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-yellow-400">Grupo {group}</h3>
                <span className="text-sm text-gray-500">{played}/{gMatches.length} jugados</span>
              </div>
              <div className="space-y-2">
                {gMatches.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-center gap-3 text-sm bg-gray-800 rounded px-3 py-2 ${m.played ? 'border border-green-600' : ''}`}
                  >
                    <span className="w-6 text-gray-500">{m.id}</span>
                    <span className="w-32 font-medium">{m.team1}</span>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={m.score1 ?? ''}
                      onChange={(e) => handleScore(m.id, 1, parseInt(e.target.value) || 0)}
                      className="w-14 text-center border border-gray-600 rounded bg-gray-700 text-white"
                      placeholder="-"
                    />
                    <span className="text-gray-500">:</span>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={m.score2 ?? ''}
                      onChange={(e) => handleScore(m.id, 2, parseInt(e.target.value) || 0)}
                      className="w-14 text-center border border-gray-600 rounded bg-gray-700 text-white"
                      placeholder="-"
                    />
                    <span className="font-medium">{m.team2}</span>
                    <button
                      onClick={() => handlePlayed(m.id)}
                      className={`ml-auto px-3 py-1 rounded text-xs font-bold ${
                        m.played
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {m.played ? '✓ Jugado' : 'Marcar jugado'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}