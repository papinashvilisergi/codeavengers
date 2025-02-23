/* eslint-disable react-refresh/only-export-components */
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { APP_PATHS } from "../enum";
import Loader from "@/components/loader";

const ParticipationLazy = lazy(() => import("@/pages/participation/views"));
const RequestsLazy = lazy(() => import("@/pages/requests/views"));

export const MENU_ROUTES = [
  <Route
    path={APP_PATHS.PARTICIPATION}
    key={APP_PATHS.PARTICIPATION}
    element={
      <Suspense fallback={<Loader />}>
        <ParticipationLazy />
      </Suspense>
    }
  />,
  <Route
    path={APP_PATHS.REQUESTS}
    key={APP_PATHS.REQUESTS}
    element={
      <Suspense fallback={<Loader />}>
        <RequestsLazy />
      </Suspense>
    }
  />,
];
