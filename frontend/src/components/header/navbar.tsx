import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Globe, Briefcase, Menu } from "lucide-react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
// import { useEffect } from "react";

const Navbar = () => {
  const { lang } = useParams();
  const path = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const switchLang = lang === "en" ? "ka" : "en";
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    const newPath = path.pathname.replace(`/${lang}/`, `/${lng}/`);
    console.log(newPath);
    navigate(newPath + path.search);
  };

  // useEffect(() => {
  //   changeLang(String(lang));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lang]);
  return (
    <>
      <ul className="flex items-center flex-row space-x-4 lg:space-x-6 text-white ">
        <li className="hidden lg:block">
          <NavLink
            to="#"
            aria-current="page"
            className="hover:text-white font-primaryMedium"
          >
            {t("login.site")}
          </NavLink>
        </li>
        <li className="hidden lg:block">
          <NavLink to="#" className="hover:text-white font-primaryMedium">
            {t("login.sec")}
          </NavLink>
        </li>
        <li className="hidden lg:block">
          <NavLink to="#" className="hover:text-white font-primaryMedium">
            {t("login.contact")}
          </NavLink>
        </li>
        <li
          onClick={() => changeLang(switchLang)}
          className="hover:text-white font-primaryMedium cursor-pointer"
        >
          <div className="flex flex-row gap-1 font-semibold text-sm items-center">
            <Globe size={16} />
            <span> {t("login.lang")}</span>
          </div>
        </li>
        <li>
          <NavLink to="#">
            <Button className="bg-[#40c1f1] flex flex-row hover:bg-[#40c1f1] border-none ">
              <div className="flex flex-row gap-1  items-center">
                <Briefcase size={16} />
                <span className="pt-1 font-primaryUpper font-bold text-lg">
                  {t("login.business")}
                </span>
              </div>
            </Button>
          </NavLink>
        </li>
      </ul>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="bg-background hover:border-none mt-2 text-white w-auto p-0 ml-4 focus-visible:ring-0 focus-visible:border-none">
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-full mt-[100px] bg-white">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <div className="flex-flex-col text-black space-y-3 text-sm font-primaryBold">
              <div>
                <NavLink
                  to="#"
                  aria-current="page"
                  className=" font-primaryMedium"
                >
                  {t("login.site")}
                </NavLink>
              </div>
              <div>
                <NavLink to="#" className=" font-primaryMedium">
                  {t("login.sec")}
                </NavLink>
              </div>
              <div>
                <NavLink to="#" className=" font-primaryMedium">
                  {t("login.contact")}
                </NavLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Navbar;
