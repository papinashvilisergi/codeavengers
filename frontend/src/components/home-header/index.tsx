import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, MessageSquare, Mail, Settings } from "lucide-react";
import HomeNavbar from "./navbar";
import { useTranslation } from "react-i18next";
import { meAtom } from "@/store/auth";
import { useAtomValue } from "jotai";

const HomeHeader = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const userInfo = useAtomValue(meAtom);
  const navigate = useNavigate();

  const menuDesc = location.pathname.includes("requests")
    ? t("main.requests")
    : t("main.participation");
  const { lang } = useParams();
  const logoImg = lang === "ka" ? "Logo-ka.svg" : "Logo-en.svg";

  const hanleLogOut = () => {
    localStorage.removeItem("authUser");
    navigate(`/${lang}/login`);
  };

  return (
    <header className="flex flex-col">
      <div className="bg-primary flex  items-center">
        <div className="w-4/5 mx-auto flex items-center justify-between h-[50px]">
          <div className="">
            <img src={`../${logoImg}`} className="h-[36px]" />
          </div>
          <div className="flex flex-row items-center gap-4 text-white">
            <div>{userInfo?.first_name + " " + userInfo?.last_name}</div>
            <div>
              <Avatar>
                <AvatarImage src={userInfo?.avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <LogOut onClick={hanleLogOut} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#333333f2] text-white">
        <div className="w-4/5 flex flex-row mx-auto h-[40px] justify-between items-center">
          <div>
            <HomeNavbar />
          </div>
          <div className="flex flex-row gap-4">
            <MessageSquare />
            <Mail />
            <Settings />
          </div>
        </div>
      </div>
      <div className="shadow-md">
        <div className="w-4/5 mx-auto h-[55px] flex font-semibold text-2xl font-primaryRegular text-gray-700 items-center">
          {menuDesc}
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
