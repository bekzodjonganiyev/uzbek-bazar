import { ReactElement } from "react";
import {
  FacebookIcon,
  InstaIcon,
  LogoIcon,
  MailIcon,
} from "../../assets/icons";
import List from "./List";
import { CurrencySelect, LanguageSelect } from "../reusablecomponents/select";

const Footer = (): ReactElement => {
  const data = [
    { title: "list 1", items: ["salom", "alik"] },
    { title: "list 2", items: ["salom", "alik"] },
    { title: "list 3", items: ["salom", "alik"] },
  ];
  return (
    <div className="p-5">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-1/2">
          <LogoIcon />
          <span className="text-black-600 font-inter text-base font-normal leading-6 block my-6">
            Phosf luorescently engage worldwide method process shopping.
          </span>
          <div className="flex space-x-7 hidden md:flex">
            <FacebookIcon />
            <InstaIcon />
            <MailIcon />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between">
          {data.map((e, ind) => (
            <List key={ind} title={e.title} items={e.items} />
          ))}
        </div>
      </div>
      <hr className="hidden md:block my-3" />
      <div className="xs:flex-col-reverse md:flex justify-between items-center">
        <h2 className="flex justify-center">
          © 2023 «UZBEK BAZAR». Barcha huquqlar himoyalangan
        </h2>
        <div className="flex justify-center my-3 space-x-5 md:hidden">
          <FacebookIcon />
          <InstaIcon />
          <MailIcon />
        </div>
        <div className="flex justify-center space-x-5">
          <LanguageSelect />
          <CurrencySelect />
        </div>
      </div>
    </div>
  );
};

export default Footer;
