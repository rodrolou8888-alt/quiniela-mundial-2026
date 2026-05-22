export interface Match {
  id: number;
  phase: 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'bronze' | 'final';
  group?: string;
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  played: boolean;
  date?: string;
  time?: string;
}

export const groupMatches: [string, string, string][] = [
  // Group A
  ['A', 'Mexico', 'South Africa'],
  ['A', 'Korea Republic', 'Czechia'],
  ['A', 'Czechia', 'South Africa'],
  ['A', 'Switzerland', 'Bosnia and Herzegovina'],
  ['A', 'Canada', 'Qatar'],
  ['A', 'Mexico', 'Korea Republic'],
  ['A', 'Czechia', 'Mexico'],
  ['A', 'South Africa', 'Korea Republic'],
  // Group B
  ['B', 'Canada', 'Bosnia and Herzegovina'],
  ['B', 'Qatar', 'Switzerland'],
  ['B', 'Switzerland', 'Bosnia and Herzegovina'],
  ['B', 'Canada', 'Qatar'],
  ['B', 'Switzerland', 'Canada'],
  ['B', 'Bosnia and Herzegovina', 'Qatar'],
  // Group C
  ['C', 'Haiti', 'Scotland'],
  ['C', 'Brazil', 'Morocco'],
  ['C', 'Brazil', 'Haiti'],
  ['C', 'Scotland', 'Morocco'],
  ['C', 'Scotland', 'Brazil'],
  ['C', 'Morocco', 'Haiti'],
  // Group D
  ['D', 'USA', 'Paraguay'],
  ['D', 'Australia', 'Türkiye'],
  ['D', 'Türkiye', 'Paraguay'],
  ['D', 'USA', 'Australia'],
  ['D', 'Türkiye', 'USA'],
  ['D', 'Paraguay', 'Australia'],
  // Group E
  ['E', "Côte d'Ivoire", 'Ecuador'],
  ['E', 'Germany', 'Curaçao'],
  ['E', 'Germany', "Côte d'Ivoire"],
  ['E', 'Ecuador', 'Curaçao'],
  ['E', 'Curaçao', "Côte d'Ivoire"],
  ['E', 'Ecuador', 'Germany'],
  // Group F
  ['F', 'Netherlands', 'Japan'],
  ['F', 'Sweden', 'Tunisia'],
  ['F', 'Netherlands', 'Sweden'],
  ['F', 'Tunisia', 'Japan'],
  ['F', 'Tunisia', 'Netherlands'],
  ['F', 'Japan', 'Sweden'],
  // Group G
  ['G', 'IR Iran', 'New Zealand'],
  ['G', 'Belgium', 'Egypt'],
  ['G', 'Belgium', 'IR Iran'],
  ['G', 'New Zealand', 'Egypt'],
  ['G', 'Egypt', 'IR Iran'],
  ['G', 'New Zealand', 'Belgium'],
  // Group H
  ['H', 'Saudi Arabia', 'Uruguay'],
  ['H', 'Spain', 'Cabo Verde'],
  ['H', 'Uruguay', 'Cabo Verde'],
  ['H', 'Spain', 'Saudi Arabia'],
  ['H', 'Cabo Verde', 'Saudi Arabia'],
  ['H', 'Uruguay', 'Spain'],
  // Group I
  ['I', 'France', 'Senegal'],
  ['I', 'Iraq', 'Norway'],
  ['I', 'Norway', 'Senegal'],
  ['I', 'France', 'Iraq'],
  ['I', 'Senegal', 'Iraq'],
  ['I', 'Norway', 'France'],
  // Group J
  ['J', 'Argentina', 'Algeria'],
  ['J', 'Austria', 'Jordan'],
  ['J', 'Argentina', 'Austria'],
  ['J', 'Jordan', 'Algeria'],
  ['J', 'Jordan', 'Argentina'],
  ['J', 'Algeria', 'Austria'],
  // Group K
  ['K', 'Portugal', 'Congo DR'],
  ['K', 'Uzbekistan', 'Colombia'],
  ['K', 'Portugal', 'Uzbekistan'],
  ['K', 'Colombia', 'Congo DR'],
  ['K', 'Congo DR', 'Uzbekistan'],
  ['K', 'Colombia', 'Portugal'],
  // Group L
  ['L', 'Ghana', 'Panama'],
  ['L', 'England', 'Croatia'],
  ['L', 'England', 'Ghana'],
  ['L', 'Panama', 'Croatia'],
  ['L', 'Panama', 'England'],
  ['L', 'Croatia', 'Ghana'],
];

export const initialMatches: Match[] = [
  // Group stage (72 matches)
  ...groupMatches.map(([group, team1, team2], i) => ({
    id: i + 1,
    phase: 'group' as const,
    group,
    team1,
    team2,
    score1: null,
    score2: null,
    played: false,
  })),
  // Round of 32 (matches 73-88)
  { id: 73, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 74, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 75, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 76, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 77, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 78, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 79, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 80, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 81, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 82, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 83, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 84, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 85, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 86, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 87, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 88, phase: 'round32', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  // Round of 16 (matches 89-96)
  { id: 89, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 90, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 91, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 92, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 93, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 94, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 95, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 96, phase: 'round16', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  // Quarter finals (matches 97-100)
  { id: 97, phase: 'quarter', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 98, phase: 'quarter', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 99, phase: 'quarter', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 100, phase: 'quarter', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  // Semi finals (matches 101-102)
  { id: 101, phase: 'semi', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  { id: 102, phase: 'semi', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  // Bronze match (103)
  { id: 103, phase: 'bronze', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
  // Final (104)
  { id: 104, phase: 'final', team1: 'TBD', team2: 'TBD', score1: null, score2: null, played: false },
];