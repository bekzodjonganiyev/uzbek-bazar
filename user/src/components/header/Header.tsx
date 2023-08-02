import { Sheet } from "../ui/sheet"
import { CustomSelect } from "@/components/common"
import { SiderOpener, SiderBody, Menu } from "./header-elements"

import { EnFlagIcon, HumanIcon, PhoneIcon, RuFlagIcon, SearchIcon, ShopCardIcon, UzFlagIcon } from "@/assets/icons"


export const Header = (): JSX.Element => {
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
    <header className="w-full">
      <Sheet>
        <div className="container border border-red-300 flex flex-col max-md:py-2">

          {/* begin::TOP HEADER */}
          <div className="md:flex hidden justify-between items-center">
            <div className="flex gap-2"><PhoneIcon /> Call Markaz +998 (90) 123-45-67</div>
            <div className="flex gap-5">

              {/* |---SELL WITH US---| */}
              <CustomSelect
                width="w-32"
                items={[]}
                changeHandler={(e) => console.log(e)}
                placeholderValue="Biz bilan soting"
              />

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
          {/* end::TOP HEADER */}

          {/* begin::MAIN HEADER */}
          <div className="flex justify-between items-center">
            {/* |---LOGO---| */}
            <div>UZEKBAZAR</div>

            {/* |---MENU---| */}
            <SiderBody />
            <Menu />

            {/* |---BUTTONS---| */}
            <div className="flex gap-2 items-center">
              <button className="max-md:hidden ">
                <SearchIcon />
              </button>
              <button className="max-md:hidden ">
                <HumanIcon />
              </button>
              <button className="flex md:gap-1 items-center ">
                <ShopCardIcon />
                <p className="bg-black rounded-full text-white text-xs md:w-6 w-5 md:h-6 h-5 flex items-center justify-center">{2}</p>
              </button>
              <div className="md:hidden flex items-center justify-center">
                <SiderOpener />
              </div>
            </div>
          </div>
          {/* end::MAIN HEADER */}

        </div>
      </Sheet>

    </header>
  )
}


