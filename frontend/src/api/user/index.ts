import { httpClient } from "..";

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await httpClient.post("api/user/login/", userData);
    console.log("from login", response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  const response = await httpClient.get("api/user/user/profile/");
  return response.data;
};
