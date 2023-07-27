import { ReactElement } from "react";
import {
  FacebookIcon,
  InstaIcon,
  LogoIcon,
  MailIcon,
  UzFlagIcon,
  RuFlagIcon,
  EnFlagIcon
} from "@/assets/icons";
import List from "./List";
import { CustomSelect } from "@/components/common";

export const Footer = (): ReactElement => {
  const footerLinks = [
    { title: "list 1", items: ["salom", "alik"] },
    { title: "list 2", items: ["salom", "alik"] },
    { title: "list 3", items: ["salom", "alik"] },
  ];

  const languages = [
    { label: "UZB", value: "uz", icon: <UzFlagIcon /> },
    { label: "RUS", value: "ru", icon: <RuFlagIcon /> },
    { label: "ENG", value: "en", icon: <EnFlagIcon /> }
  ]

  const currencys = [
    { label: "UZS", value: "usz" },
    { label: "RUB", value: "rub" },
    { label: "USD", value: "usd" }
  ]

  return (
    <footer className="w-full mb-1">
      <div className="container border border-red-300">
        <div className="w-full flex flex-col md:flex-row justify-between">

          {/* begin::LOGOS AND SOCIALS */}
          <div className="w-1/2">
            <LogoIcon />
            <span className="text-black-600 font-inter text-base font-normal leading-6 block my-6">
              Phosf luorescently engage worldwide method process shopping.
            </span>
            <div className="space-x-7 hidden md:flex">
              <FacebookIcon />
              <InstaIcon />
              <MailIcon />
            </div>
          </div>
          {/* end::LOGOS AND SOCIALS */}

          {/* begin::LINKS */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between">
            {footerLinks.map((e, ind) => (
              <List key={ind} title={e.title} items={e.items} />
            ))}
          </div>
          {/* end::LINKS */}
        </div>

        <hr className="hidden md:block my-3 border-2" />

        <div className="xs:flex-col-reverse md:flex justify-between items-center">
          <h2 className="flex justify-center">
            © 2023 «UZBEK BAZAR». Barcha huquqlar himoyalangan
          </h2>

          {/* |---RESPONSIVE SOCIALS---| */}
          <div className="flex justify-center my-3 space-x-5 md:hidden">
            <FacebookIcon />
            <InstaIcon />
            <MailIcon />
          </div>
          <div className="flex justify-center space-x-5">
            {/* |---LANG---| */}
            <CustomSelect
              items={languages}
              changeHandler={(e) => console.log(e)}
              placeholderValue="Tilni tanlang"
              defaultValue="uz"
            />

            {/* |---CURRENCY--- */}
            <CustomSelect
              items={currencys}
              changeHandler={(e) => console.log(e)}
              placeholderValue="Tilni tanlang"
              defaultValue="usz"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
