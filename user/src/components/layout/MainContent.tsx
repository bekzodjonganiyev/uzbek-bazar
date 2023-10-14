import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/toaster"
import { Header, Footer, BottomNav } from "@/components";

import { useAppDispatch } from "@/redux";
import { storeAllCarts } from "@/redux/actions/cart-action";
import { storeAllWishlist } from "@/redux/actions/wishlist-action";

export const MainContent = ():JSX.Element => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("mounted")
    dispatch(storeAllCarts(1,1,''))
    dispatch(storeAllWishlist(1,1,''))
  },[])

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <main className="flex-auto container">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
      <BottomNav className="md:hidden"/>
    </div>
  );
}
