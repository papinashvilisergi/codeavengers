import { billsRequests, loanRequests } from "@/types/participation";
import { httpClient } from "..";

export const getUserRequests = async () => {
  const response = await httpClient.get(`api/user/invitations/`);
  return response.data;
};

export const deleteUserRequests = async (id: number) => {
  const response = await httpClient.delete(`api/user/invitations/${id}/`);
  return response.data;
};

export const acceptUserRequests = async (id: number) => {
  const response = await httpClient.put(`api/user/invitations/${id}/`, {
    status: "accepted",
  });
  return response.data;
};

export const sendUserRequests = async (
  payload: loanRequests | billsRequests
) => {
  const response = await httpClient.post(`api/user/invitations/`, payload);
  return response.data;
};
