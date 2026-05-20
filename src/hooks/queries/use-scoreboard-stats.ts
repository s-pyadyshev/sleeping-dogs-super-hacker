import { useMemo } from "react";
import type { ScoreboardDerivedStats } from "../../api";
import { useGameStats } from "./use-game-stats";
import { useScores } from "./use-scores";

const emptyStats: ScoreboardDerivedStats = {
  averageScores: 0,
  averageAttempts: 0,
  wins: 0,
  lost: 0,
};

export const useScoreboardStats = () => {
  const scoresQuery = useScores();
  const gameStatsQuery = useGameStats();

  const stats = useMemo((): ScoreboardDerivedStats => {
    const wins = gameStatsQuery.data?.wins ?? 0;
    const lost = gameStatsQuery.data?.lost ?? 0;
    const scores = scoresQuery.data ?? [];

    if (scores.length === 0) {
      return { ...emptyStats, wins, lost };
    }

    const userScores = scores.map((item) => item.score);
    const userAttempts = scores.map((item) => item.attemptsUsed);

    return {
      wins,
      lost,
      averageScores:
        userScores.reduce((acc, item) => acc + item, 0) / userScores.length,
      averageAttempts:
        userAttempts.reduce((acc, item) => acc + item, 0) / userAttempts.length,
    };
  }, [scoresQuery.data, gameStatsQuery.data]);

  return {
    scores: scoresQuery.data ?? [],
    stats,
    isLoading: scoresQuery.isLoading || gameStatsQuery.isLoading,
    isError: scoresQuery.isError || gameStatsQuery.isError,
  };
};
