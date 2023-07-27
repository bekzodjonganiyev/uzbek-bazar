import { Outlet } from "react-router-dom";

import { Header, Footer } from "@/components";

function MainContent(): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainContent;
