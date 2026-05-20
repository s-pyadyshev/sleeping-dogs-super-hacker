import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys, submitScore } from "../../api";
import type { SubmitFormInterface } from "../../interfaces/submit-form";

export const useSubmitScoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.scores });
    },
  });
};
