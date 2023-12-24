import { /*useEffect*/ useState } from "react"
import { Link, /*useLocation*/ } from "react-router-dom"
import { useSelector } from "react-redux"

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { EnFlagIcon, HamburgerIcon, HumanIcon, PhoneIcon, RuFlagIcon, SearchIcon, ShopCardIcon, UzFlagIcon } from "@/assets/icons"
import { CustomSelect, CustomSheetContent } from "@/components/common"
import { CartSheet, MobileMenuSheet, SearchSheet } from "@/components/sheet-contents"

import { Menu } from "./header-elements"

import { useAppDispatch, RootState } from "@/redux"
import { setSheetContent } from "@/redux/actions"

import { currencys } from "@/utils/mocks"
// import { seacrFc } from "@/utils/searchFn"
// import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
// import { Button } from "../ui/button"
// import { X } from "lucide-react"


export const languages = [
  { label: "UZB", value: "uz", icon: <UzFlagIcon /> },
  { label: "RUS", value: "ru", icon: <RuFlagIcon /> },
  { label: "ENG", value: "en", icon: <EnFlagIcon /> }
]

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const sheetContent = useSelector((state: RootState) => state.sheetContent)
  const cart = useSelector((state: RootState) => state.cart)
  // const { pathname } = useLocation()

  const [open, setOpen] = useState<boolean>(false)
  // const [suggestMobile, setSuggestMobile] = useState<string>(localStorage.getItem("suggestMobile") || "true")
  // const [searchTerm, setSearchTerm] = useState("")
  // const [searchedProductData, setSearchedProductData] = useState<any>({
  //   loading: undefined,
  //   data: null,
  //   error: null
  // })
  // const [searchedCategoryData, setSearchedCategoryData] = useState<any>({
  //   loading: undefined,
  //   data: null,
  //   error: null
  // })

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     searchTerm ? seacrFc("products", "search", searchTerm, setSearchedProductData) : null
  //     searchTerm ? seacrFc("categories", "search", searchTerm, setSearchedCategoryData) : null
  //   }, 1000)

  //   return () => clearTimeout(delayDebounceFn)
  // }, [searchTerm])

  // console.log(searchedCategoryData, searchedProductData)

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

          {/* begin::SUGGEST ABOUT MOBILE APP */}
          {/* <div className={cn("fixed w-screen top-0 left-0 z-[9999]", suggestMobile === "true" ? "block" : "hidden")}>
            <div className="md:hidden flex items-center justify-between bg-card-bg py-5 container">
              <Button variant={"outline"} className="border-none bg-transparent p-0" onClick={() => {
                setSuggestMobile("false")
                localStorage.setItem("suggestMobile", suggestMobile)
              }}>
                <X color="gray" />
              </Button>
              <div className="flex items-center gap-2 w-4/6">
                <span>Logo</span>
                <p>Ilovada qulayroq</p>
              </div>
              <Button variant={"destructive"} className="w-1/6 mr-5">Yuklash</Button>
            </div>
          </div> */}
          {/* end::SUGGEST ABOUT MOBILE APP */}

          {/* begin::MAIN HEADER */}
          <div className={cn("flex justify-between items-center relative py-2",
          //  suggestMobile === "true" && "max-md:mt-20"
           )}>
            {/* |---LOGO---| */}
            <div><Link to="/">Logo</Link></div>

            {/* |---MENU---| */}
            <div className="md:block hidden">
              <ul className="flex gap-10">
                <li className="cursor-pointer" onClick={() => setOpen(!open)}>Katalog</li>
                <li className=""><Link to="sellers" className="w-full h-full">Do'konlar</Link></li>
                <li className=""><Link to="top-products" className="w-full h-full block">Top mahsulotlar</Link></li>
              </ul>
            </div>
            <Menu open={open} close={() => setOpen(!open)} />

            {/* |---BUTTONS---| */}
            <div className="flex gap-2 items-center">
              <SheetTrigger className="max-md:hidden" onClick={() => dispatch(setSheetContent("top", <SearchSheet />))}>
                <SearchIcon />
              </SheetTrigger>

              <Link to={"/user-profile"} className="max-md:hidden">
                <HumanIcon />
              </Link>

              <SheetTrigger className="flex md:gap-1 items-center " onClick={() => dispatch(setSheetContent("right", <CartSheet />))}>
                <ShopCardIcon />
                {/* <p className="bg-black rounded-full text-white text-xs md:w-6 w-5 md:h-6 h-5 flex items-center justify-center">{cart.length}</p> */}
                <p className="bg-black rounded-full text-white text-xs md:w-6 w-5 md:h-6 h-5 flex items-center justify-center">{cart?.ids.length}</p>
              </SheetTrigger>

              <SheetTrigger className="md:hidden flex items-center justify-center" onClick={() => dispatch(setSheetContent("right", <MobileMenuSheet />))}>
                <HamburgerIcon />
              </SheetTrigger>
            </div>
          </div>
          {/* end::MAIN HEADER */}

          {/* begin::RESPONSIVE SEARCH */}
          {/* {
            pathname !== "/sellers"
              ? <div className='max-md:flex hidden items-center justify-center my-3'>
                <div className="relative max-md:w-full h-[40px]"> */}
                  {/* TODO - icon bosilganda search qilishi kerak */}
                  {/* <SearchIcon className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
                  <Input className='md:w-[500px] w-full focus-visible:ring-transparent focus-visible:border-red-300' placeholder='Mahsulot izlash...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <div className={cn("bg-white w-full px-3 py-10 absolute top-[100%] border-input border z-40 rounded-md", searchTerm ? "visible opacity-100 duration-300" : "invisible opacity-0 duration-300")}>
                    oka
                  </div>
                </div>
              </div>
              : null
          } */}
          {/* end::RESPONSIVE SEARCH */}

        </div>
      </Sheet>

    </header>
  )
}


