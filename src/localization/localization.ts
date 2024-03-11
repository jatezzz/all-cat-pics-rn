import * as Localization from "expo-localization";
import en from "./locales/en.json";
import es from "./locales/es.json";

const translations = {
  en,
  es
};

const languageTag = Localization.locale.split("-")[0];
const messages = translations[languageTag] || translations.en;

export const t = (key: string, ...params: string[]): string => {
  let message = messages[key] || key;

  // Replace %@ with parameters passed to the function
  params.forEach(param => {
    message = message.replace("%@", param);
  });

  return message;
};
