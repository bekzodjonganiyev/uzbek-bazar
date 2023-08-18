import { useSelector } from "react-redux"

import { Sheet, SheetTrigger } from "../ui/sheet"
import { CustomSelect, CustomSheetContent } from "@/components/common"
import { SiderBody, Menu } from "./header-elements"

import { EnFlagIcon, HamburgerIcon, HumanIcon, PhoneIcon, RuFlagIcon, SearchIcon, ShopCardIcon, UzFlagIcon } from "@/assets/icons"

import { useAppDispatch, RootState } from "@/redux"
import { setSheetContent } from "@/redux/actions"


export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const sheetContent = useSelector((state: RootState) => state.sheetContent)

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
        {/* begin::CUSTOM SHEET CONTENT */}
        <CustomSheetContent side={sheetContent.side}>
          {sheetContent.children}
        </CustomSheetContent>
        {/* end::CUSTOM SHEET CONTENT */}

        <div className="container flex flex-col max-md:py-2">

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
          <div className="flex justify-between items-center py-2">
            {/* |---LOGO---| */}
            <div>UZEKBAZAR</div>

            {/* |---MENU---| */}
            <Menu />

            {/* |---BUTTONS---| */}
            <div className="flex gap-2 items-center">
              <SheetTrigger className="max-md:hidden" onClick={() => dispatch(setSheetContent("top", <p>xxx</p>))}>
                <SearchIcon />
              </SheetTrigger>

              <button className="max-md:hidden">
                <HumanIcon />
              </button>

              <SheetTrigger className="flex md:gap-1 items-center " onClick={() => dispatch(setSheetContent("right", <p>savatcha</p>))}>
                <ShopCardIcon />
                <p className="bg-black rounded-full text-white text-xs md:w-6 w-5 md:h-6 h-5 flex items-center justify-center">{2}</p>
              </SheetTrigger>

              <SheetTrigger className="md:hidden flex items-center justify-center" onClick={() => dispatch(setSheetContent("right", <SiderBody />))}>
                <HamburgerIcon />
              </SheetTrigger>
            </div>
          </div>
          {/* end::MAIN HEADER */}

        </div>
      </Sheet>

    </header>
  )
}


