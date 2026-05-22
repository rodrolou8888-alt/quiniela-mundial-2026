import { Match } from '@/data/matches';

const JSONBIN_BASE = 'https://api.jsonbin.io';
const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID || '';

export interface Prediction {
  playerId: string;
  playerName: string;
  predictions: Record<number, [number, number]>; // matchId -> [score1, score2]
  submittedAt: string;
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  totalPoints: number;
  exactScores: number;
  correctResults: number;
  wrongPredictions: number;
}

export async function getMatches(): Promise<Match[]> {
  if (!BIN_ID) return [];
  const res = await fetch(`${JSONBIN_BASE}/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Access-Key': process.env.JSONBIN_ACCESS_KEY || '' },
    next: { revalidate: 10 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.record?.matches || [];
}

export async function saveMatches(matches: Match[]): Promise<void> {
  if (!BIN_ID) return;
  await fetch(`${JSONBIN_BASE}/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': process.env.JSONBIN_ACCESS_KEY || '',
    },
    body: JSON.stringify({ matches }),
  });
}

export async function getPredictions(): Promise<Record<string, Prediction>> {
  if (!BIN_ID) return {};
  const res = await fetch(`${JSONBIN_BASE}/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Access-Key': process.env.JSONBIN_ACCESS_KEY || '' },
    next: { revalidate: 10 },
  });
  if (!res.ok) return {};
  const data = await res.json();
  return data.record?.predictions || {};
}

export async function savePrediction(prediction: Prediction): Promise<void> {
  if (!BIN_ID) return;
  const predictions = await getPredictions();
  predictions[prediction.playerId] = prediction;
  await fetch(`${JSONBIN_BASE}/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': process.env.JSONBIN_ACCESS_KEY || '',
    },
    body: JSON.stringify({ predictions }),
  });
}

export function calculatePoints(
  match: Match,
  pred: [number, number]
): { points: number; exact: boolean; correctResult: boolean } {
  const [pred1, pred2] = pred;
  const real1 = match.score1!;
  const real2 = match.score2!;

  const exact = pred1 === real1 && pred2 === real2;
  const correctResult =
    (real1 > real2 && pred1 > pred2) ||
    (real1 < real2 && pred1 < pred2) ||
    real1 === real2;

  return {
    points: exact ? 3 : correctResult ? 1 : 0,
    exact,
    correctResult: !exact && correctResult,
  };
}

export function buildLeaderboard(
  matches: Match[],
  predictions: Record<string, Prediction>
): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];

  for (const pred of Object.values(predictions)) {
    let totalPoints = 0;
    let exactScores = 0;
    let correctResults = 0;
    let wrongPredictions = 0;

    for (const [matchId, predScore] of Object.entries(pred.predictions)) {
      const match = matches.find((m) => m.id === Number(matchId));
      if (!match || !match.played) continue;
      const { points, exact, correctResult } = calculatePoints(match, predScore);
      totalPoints += points;
      if (exact) exactScores++;
      else if (correctResult) correctResults++;
      else wrongPredictions++;
    }

    entries.push({
      playerId: pred.playerId,
      playerName: pred.playerName,
      totalPoints,
      exactScores,
      correctResults,
      wrongPredictions,
    });
  }

  return entries.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
    if (b.correctResults !== a.correctResults) return b.correctResults - a.correctResults;
    return a.playerName.localeCompare(b.playerName);
  });
}