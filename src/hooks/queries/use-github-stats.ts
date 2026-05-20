import { useQuery } from "@tanstack/react-query";
import { getGithubStats, queryKeys } from "../../api";

export const useGithubStats = () =>
  useQuery({
    queryKey: queryKeys.github,
    queryFn: getGithubStats,
  });
