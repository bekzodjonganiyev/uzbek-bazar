import { Drawer, Input } from "antd";
import { CancelIcon, LogoIcon } from "../../../assets/icons";

type SearchDrawerComponentProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

const SearchDrawerComponent = ({
  open,
  handleDrawerClose,
}: SearchDrawerComponentProps): React.ReactElement => {
  const onSearch = (e: string) => {
    console.log(e);
  };
  return (
    <Drawer
      placement="top"
      closable={false}
      onClose={handleDrawerClose}
      open={open}
      className="h-auto min-h-400"
      style={{ height: "auto", minHeight: "300px" }}
    >
      <div className="p-3">
        <div className="flex justify-between">
          <LogoIcon />
          <div onClick={handleDrawerClose}>
            <CancelIcon />
          </div>
        </div>
        <div className="w-full mt-5 mb-1 mx-auto md:w-3/4 lg:w-1/3">
          <Input.Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            onInput={(e) => onSearch(e.currentTarget.value)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default SearchDrawerComponent;
