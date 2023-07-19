import { Drawer } from "antd";
import { HeaderBottom, HeaderTop } from "..";

type DrawerComponentProps = {
  isDrawerOpen: boolean;
  handleDrawerClose: () => void;
};

const MainDrower = ({
  isDrawerOpen,
  handleDrawerClose,
}: DrawerComponentProps): React.ReactElement => {
  return (
    <Drawer placement="right" onClose={handleDrawerClose} open={isDrawerOpen}>
      <div className="p-3">
        <HeaderTop />
        <HeaderBottom isMobile />
      </div>
    </Drawer>
  );
};

export default MainDrower;
