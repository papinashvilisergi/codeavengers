import AppRoutes from "@/routes";
import { meAtom, userAtom } from "@/store/auth";
import { setAuthToken } from "@/api";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { getUserInfo } from "./api/user";

function App() {
  const [me, setMe] = useAtom(meAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthToken(parsedUser.access);
      } catch (error) {
        setAuthToken(null);
        console.log(error);
        localStorage.removeItem("authUser");
      }
    }
  }, [me]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserInfo();
        setMe(res);
      } catch (error) {
        setMe(null);
        setAuthToken(null);
        localStorage.removeItem("authUser");
        console.log(error);
      }
    };

    fetchData();
  }, [user, setMe]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
