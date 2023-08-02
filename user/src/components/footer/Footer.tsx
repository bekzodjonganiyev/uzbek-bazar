import { ReactElement } from "react";
import { FacebookIcon, InstaIcon, LogoIcon, MailIcon, UzFlagIcon, RuFlagIcon, EnFlagIcon } from "@/assets/icons";
import { CustomSelect, CustomAccardion } from "@/components/common";
import { Link } from "react-router-dom";

export const Footer = (): ReactElement => {
  const footerLinks = [
    { title: "Foydalanuvchilarga", value: "list 1", content: ["salom", "alik"] },
    { title: "Tadbirkorlarga", value: "list 2", content: ["salom", "alik"] },
    { title: "Kompaniya", value: "list 3", content: ["salom", "alik"] },
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
    <footer className="w-full bg-footer pt-16 pb-3">
      <div className="container">
        <div className="w-full flex flex-col lg:flex-row justify-between">

          {/* begin::LOGOS AND SOCIALS */}
          <div className="md:w-1/2">
            <LogoIcon />
            <span className="text-base font-normal leading-6 block my-6">
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
          <div className="max-md:mb-5">
            <div className="lg:flex gap-28 hidden">
              {
                footerLinks.map(item => (
                  <ul>
                    <h2 className="text-base font-medium">{item.title}</h2>
                    {
                      item.content.map(subItem => (
                        <li><Link to={subItem}>{subItem}</Link></li>
                      ))
                    }
                  </ul>
                ))
              }
            </div>
            <CustomAccardion items={footerLinks} className="lg:hidden" />
          </div>
          {/* end::LINKS */}
        </div>

        <hr className="hidden md:block my-3 border" />

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
