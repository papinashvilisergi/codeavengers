import HomeHeader from "@/components/home-header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>
        <HomeHeader />
        <main className="flex-grow py-8 min-h-screen bg-[#f0f3f4]">
          <Outlet />
        </main>
      </div>
    </>
  );
};
