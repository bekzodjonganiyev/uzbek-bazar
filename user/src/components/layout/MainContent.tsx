import { Outlet } from "react-router-dom";
import { CustomHeader } from "../header";
import Footer from "../footer";

function MainContent(): JSX.Element {
  return (
    <div>
      <CustomHeader />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainContent;
