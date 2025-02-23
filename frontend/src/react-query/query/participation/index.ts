import { getUserInfo } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum.ts";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: getUserInfo,
  });
};
