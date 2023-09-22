import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster"

import { Header, Footer } from "@/components";

export const MainContent = ():JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-auto container">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
