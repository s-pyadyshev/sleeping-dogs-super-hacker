export interface GithubRepoStats {
  stargazers_count: number;
}

export interface ScoreEntry {
  username: string;
  code: number[] | string;
  company: string;
  date: string;
  score: number;
  attemptsUsed: number;
  comment: string;
}

export interface GameStatsDoc {
  wins: number;
  lost: number;
}

export interface ScoreboardDerivedStats extends GameStatsDoc {
  averageScores: number;
  averageAttempts: number;
}
