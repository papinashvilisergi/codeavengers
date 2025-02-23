import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common["Authorization"];
  }
};
export const httpClient = axios.create(axiosConfig);
