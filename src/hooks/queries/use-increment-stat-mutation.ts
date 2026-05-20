import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementStat, queryKeys } from "../../api";

export const useIncrementStatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: incrementStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gameStats });
    },
  });
};
