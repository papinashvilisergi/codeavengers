import { getUserRequests } from "@/api/requests";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum.ts";

export const useGetUserRequests = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REQUESTS],
    queryFn: getUserRequests,
  });
};
