import { Navigate, Outlet, useParams } from "react-router-dom";
import React, { PropsWithChildren } from "react";

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  let token: string | null = null;
  const { lang } = useParams();

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser.access;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }

  if (!token) {
    return <Navigate to={`/${lang}/login`} />;
  }

  return children || <Outlet />;
};
