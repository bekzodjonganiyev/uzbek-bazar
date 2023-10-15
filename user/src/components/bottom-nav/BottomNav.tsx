import { Link } from "react-router-dom"
import { Heart, Home, SearchIcon, ShoppingCart, UserIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Props = {
  className: string
}

export const BottomNav = ({ className }: Props) => {
  return (
    <div className={cn("z-[10] fixed bottom-0 w-screen bg-black py-5 min-w-[320px]", className)}>
      <ul className="flex justify-between container">
        <li>
          <Link to={"/"} className="">
            <p className="flex flex-col items-center">
              <Home color="white" />
              <span className="text-white text-xs">Bosh sahifa</span>
            </p>
          </Link>
        </li>

        <li>
          <Link to={"/search"} className="">
            <p className="flex flex-col items-center">
              <SearchIcon color="white" />
              <span className="text-white text-xs">Qidiruv</span>
            </p>
          </Link>
        </li>
        <li>
          <Link to={"/favourites"} className="">
            <p className="flex flex-col items-center">
              <Heart color="white" />
              <span className="text-white text-xs">Sevimlilar</span>
            </p>
          </Link>
        </li>
        <li>
          <Link to={"/cart"} className="">
            <p className="flex flex-col items-center">
              <ShoppingCart color="white" />
              <span className="text-white text-xs">Savatcha</span>
            </p>
          </Link>
        </li>
        <li>
          <Link to={"/user-profile"} className="">
            <p className="flex flex-col items-center">
              <UserIcon color="white" />
              <span className="text-white text-xs">Kirish</span>
            </p>
          </Link>
        </li>
      </ul>
    </div>
  )
}