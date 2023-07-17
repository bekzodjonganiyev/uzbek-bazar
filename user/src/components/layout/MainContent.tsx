import { Outlet } from "react-router-dom";

function MainContent(): JSX.Element {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainContent;
