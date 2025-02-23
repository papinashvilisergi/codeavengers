/* eslint-disable react-refresh/only-export-components */
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { APP_PATHS } from "../enum";
import Loader from "@/components/loader";

const LoginPageLazy = lazy(() => import("@/pages/login/views"));

export const AUTH_ROUTES = [
  <Route
    index
    key="index"
    element={
      <Suspense fallback={<Loader />}>
        <LoginPageLazy />
      </Suspense>
    }
  />,
  <Route
    path={APP_PATHS.LOGIN}
    key={APP_PATHS.LOGIN}
    element={
      <Suspense fallback={<Loader />}>
        <LoginPageLazy />
      </Suspense>
    }
  />,
];
