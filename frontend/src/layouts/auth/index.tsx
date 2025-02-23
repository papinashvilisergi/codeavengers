import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <div>
        <Header />
        <main className="flex-grow py-8 min-h-screen bg-primary">
          <Outlet />
        </main>
      </div>
    </>
  );
};
