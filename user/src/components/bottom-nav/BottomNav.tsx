import { NavLink, useLocation } from "react-router-dom"
import { Heart, Home, Search, ShoppingCart, UserIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Props = {
  className: string
}

export const BottomNav = ({ className }: Props) => {
  const { pathname } = useLocation()

  return (
    <div className={cn("z-[10] fixed -bottom-2 w-full bg-black py-5 min-w-[320px]", className)}>
      <ul className="flex justify-between container">
        <li className="">
          <NavLink to={"/"} className="">
            <p className="flex flex-col items-center">
              <Home color={`${pathname === "/" ? "red" : "white"}`} />
              <span className="text-white text-xs">Bosh sahifa</span>
            </p>
          </NavLink>
        </li>

        <li className="">
          <NavLink to={"/search"} className="">
            <p className="flex flex-col items-center">
              <Search color={`${pathname === "/search" ? "red" : "white"}`} />
              <span className="text-white text-xs">Qidiruv</span>
            </p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to={"/favourites"} className="">
            <p className="flex flex-col items-center">
              <Heart color={`${pathname === "/favourites" ? "red" : "white"}`} />
              <span className="text-white text-xs">Sevimlilar</span>
            </p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to={"/cart"} className="">
            <p className="flex flex-col items-center">
              <ShoppingCart color={`${pathname === "/cart" ? "red" : "white"}`} />
              <span className="text-white text-xs">Savatcha</span>
            </p>
          </NavLink>
        </li>
        <li className="">
          <NavLink to={"/user-profile"} className="">
            <p className="flex flex-col items-center">
              <UserIcon color={`${pathname.split("/")[1] === "user-profile" ? "red" : "white"}`} />
              <span className="text-white text-xs">Kirish</span>
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
