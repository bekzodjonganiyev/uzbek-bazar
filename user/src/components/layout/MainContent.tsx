import { useEffect } from "react";
import { Outlet, /*useLocation*/ } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"
import { Header, Footer, BottomNav } from "@/components";

import { useAppDispatch } from "@/redux";
import { storeAllCarts } from "@/redux/actions/cart-action";
import { storeAllWishlist } from "@/redux/actions/wishlist-action";
import { cn } from "@/lib/utils";

export const MainContent = (): JSX.Element => {
  const dispatch = useAppDispatch()
  // const { pathname } = useLocation()


  useEffect(() => {
    dispatch(storeAllCarts(1, 1, ''))
    dispatch(storeAllWishlist())
  }, [])

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      {/* header fixed bolgani uchun "/sellers" route da main contentdan margin-top ni olib tashlash kerak */}
      <main className={cn("flex-auto container",
      //  pathname !== "/sellers" && "md:mt-24 mt-32"
       )}>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
      <BottomNav className="md:hidden" />
    </div>
  );
}
