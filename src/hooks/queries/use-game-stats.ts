import { useQuery } from "@tanstack/react-query";
import { fetchGameStats, queryKeys } from "../../api";

export const useGameStats = () =>
  useQuery({
    queryKey: queryKeys.gameStats,
    queryFn: fetchGameStats,
  });
