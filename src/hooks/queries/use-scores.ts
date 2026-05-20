import { useQuery } from "@tanstack/react-query";
import { fetchScores, queryKeys } from "../../api";

export const useScores = () =>
  useQuery({
    queryKey: queryKeys.scores,
    queryFn: fetchScores,
  });
