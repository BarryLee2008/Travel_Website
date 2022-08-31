// 初始化引入i8n模块
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 引入语言json文件
import transilation_en from './en.json'
import transilation_zh from './zh.json'

// 声明resource对象，保存语言json文件
const resources = {
    en: { translation: transilation_en },
    zh: { translation: transilation_zh }
};

// 配置如何初始化i8n框架
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
  
  export default i18n;