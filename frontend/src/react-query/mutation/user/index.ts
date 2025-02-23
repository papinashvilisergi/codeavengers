import { login } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";

export const useLogin = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
  });
};
