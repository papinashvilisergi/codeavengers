import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/auth";
import { Layout } from "@/layouts/main";
import NotFoundPage from "@/pages/404";
import { MENU_ROUTES } from "./menu";
import { DefaultLang } from "@/locale";
import { AUTH_ROUTES } from "./auth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":lang">
          <Route element={<Layout />}>
            {MENU_ROUTES}
            <Route path="*" element={<NotFoundPage />} key="not_found" />
          </Route>
          <Route element={<AuthLayout />}>{AUTH_ROUTES}</Route>
          <Route path="*" element={<Navigate to={`/${DefaultLang}/login`} />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${DefaultLang}/login`} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
