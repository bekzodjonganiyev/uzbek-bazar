// import en from "../../public/locales/en/en.json";
// import ru from "../../public/locales/ru/ru.json";
// import uz from "../../public/locales/uz/uz.json";

// type langType = {
//   [key: string]: string;
// };

// type texts = {
//   en: langType;
//   ru: langType;
//   uz: langType;
// };

// export const translate = (
//   keyName: string,
//   lang: string,
//   ...otherKeys: string[]
// ) => {
//   try {
//     const translations: texts = {
//       en,
//       ru,
//       uz,
//     };
//     const translationKeys = keyName.split(".");

//     let translation: any = translations[lang];
//     for (let i = 0; i < translationKeys.length; i++) {
//       translation = translation[translationKeys[i]];
//     }
//     if (typeof translation === "string" && otherKeys.length > 0) {
//       translation = translation.replace(/\$(\d+)/g, (match, p1) => {
//         const index = parseInt(p1) - 1;
//         if (index >= 0 && index < otherKeys.length) {
//           return otherKeys[index];
//         }
//         return match;
//       });
//     }

//     return translation || keyName;
//   } catch {
//     return keyName;
//   }
// };
