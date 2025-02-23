import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LoginKa from "./ka/login.json";
import LoginEn from "./en/login.json";

import MainKa from "./ka/main.json";
import MainEn from "./en/main.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        login: LoginKa,
        main: MainKa,
      },
    },
    en: {
      translation: {
        login: LoginEn,
        main: MainEn,
      },
    },
  },
  lng: "en",
  fallbackLng: "ka",

  interpolation: {
    escapeValue: false,
  },
});

export const LangList = ["ka", "en"];
export const DefaultLang = "en";
