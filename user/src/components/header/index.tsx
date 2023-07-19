import React, { useState } from "react";
import { Row, Col, Select, Badge } from "antd";
import {
  HamburgerIcon,
  HumanIcon,
  LogoIcon,
  PhoneIcon,
  SearchIcon,
  ShopCardIcon,
} from "../../assets/icons";
import { Link } from "react-router-dom";
import MainDrower from "./drawers/MainDrower";
import SearchDrawerComponent from "./drawers/SearchDrawer";
import { CurrencySelect, LanguageSelect } from "../reusablecomponents/select";

const { Option } = Select;

export const HeaderTop = (): React.ReactElement => {
  return (
    <Row className="flex justify-between w-full">
      <Col>
        <div className="flex items-center">
          <PhoneIcon />
          <span className="ms-2">
            Call Markaz{" "}
            <a href="tel:+998901234567" className="hover:text-inherit">
              +998 (90) 123 45 67
            </a>
          </span>
        </div>
      </Col>
      <Col>
        <Select defaultValue="uz" bordered={false}>
          <Option value="en">Biz bilan soting</Option>
        </Select>

        <LanguageSelect />
        <CurrencySelect />
      </Col>
    </Row>
  );
};

type HeaderBottomProps = {
  isMobile: boolean;
};

export const HeaderBottom = ({
  isMobile,
}: HeaderBottomProps): React.ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSearchDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Row className="md:mt-4 justify-between items-center">
      <Col>
        <Link to="/" className={`${isMobile ? "hidden" : "block"}`}>
          <LogoIcon />
        </Link>
      </Col>
      <Col
        className={`flex items-center justify-between ${
          !isMobile ? "hidden md:flex" : ""
        }`}
      >
        <div className="space-x-2">
          <Select defaultValue="catalog" className={`mr-2 `} bordered={false}>
            <Option value="catalog">Catalog</Option>
            <Option value="salom">salom</Option>
          </Select>
          <Select defaultValue="store" className="mr-2" bordered={false}>
            <Option value="store">Store</Option>
            <Option value="store2">Store2</Option>
          </Select>
        </div>
        <h2 className="ml-4 cursor-pointer">Top mahsulotlar</h2>
      </Col>
      <Col className="flex">
        <div
          className={`mx-2 ${!isMobile ? "hidden md:flex" : ""}`}
          onClick={() => setOpen(true)}
        >
          <SearchIcon />
        </div>
        <div className={`mx-2 ${!isMobile ? "hidden md:flex" : ""}`}>
          <HumanIcon />
        </div>
        <div className="mx-1 flex items-center">
          <ShopCardIcon />
          <Badge count={2} style={{ backgroundColor: "#000", color: "#FFF" }} />
        </div>
        <div
          className={`${isMobile ? "hidden" : "md:hidden"}`}
          onClick={handleDrawerOpen}
        >
          <HamburgerIcon />
        </div>
      </Col>
      <MainDrower
        isDrawerOpen={isDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <SearchDrawerComponent
        open={open}
        handleDrawerClose={handleSearchDrawerClose}
      />
    </Row>
  );
};

export const CustomHeader = (): React.ReactElement => {
  return (
    <div className="p-5 fixed top-0 left-0 bg-red-500 w-full">
      <div className="hidden md:flex w-full">
        <HeaderTop />
      </div>
      <HeaderBottom isMobile={false} />
    </div>
  );
};
