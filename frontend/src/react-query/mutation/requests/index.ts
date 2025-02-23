import {
  deleteUserRequests,
  acceptUserRequests,
  sendUserRequests,
} from "@/api/requests";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";

export const useDeleteUserRequests = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_REQUEST],
    mutationFn: deleteUserRequests,
  });
};

export const useAcceptUserRequests = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ACCEPT_REQUEST],
    mutationFn: acceptUserRequests,
  });
};

export const useSendUserRequests = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.SEND_REQUEST],
    mutationFn: sendUserRequests,
  });
};
