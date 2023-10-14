import { ReactElement } from "react";
import { FacebookIcon, InstaIcon, LogoIcon, MailIcon, UzFlagIcon, RuFlagIcon, EnFlagIcon } from "@/assets/icons";
import { CustomSelect, CustomAccardion } from "@/components/common";
import { Link } from "react-router-dom";

export const Footer = (): ReactElement => {
  const footerLinks = [
    { title: "Foydalanuvchilarga", value: "list 1", content: [{link: "/contact-us", title: "Biz bilan bog’lanish"}, {link: "/faq", title: "Savol-javoblar"}] },
    { title: "Tadbirkorlarga", value: "list 2", content: [{link: "/sell-with-us", title: "Biz bilan soting"}, {link: "sellers.uzbekbazar.uz", title: "Sotuvchi kabinetiga kirish"}] },
    { title: "Kompaniya", value: "list 3", content: [{link: "/about-us", title: "Biz haqimizda"}, {link: "/pravicy-policy", title: "Maxfiylik kelishuvi"},  {link: "/user-policy", title: "Foydalanuvchi kelishuvi"}] },
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
    <footer className="w-full bg-footer pt-16 pb-3 max-md:pb-24">
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
            <div className="lg:flex xl:gap-20 gap-10 hidden">
              {
                footerLinks.map((item, id )=> (
                  <ul key={id}>
                    <h2 className="text-base font-semibold mb-1">{item.title}</h2>
                    {
                      item.content.map((subItem, id) => (
                        <li className="mb-3 leading-4" key={id}><Link to={subItem.link}>{subItem.title}</Link></li>
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
