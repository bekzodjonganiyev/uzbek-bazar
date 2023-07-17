import { ReactElement } from "react";
import {
  CancelIcon,
  ColumnsIcon,
  DeleteIcon,
  EyeIcon,
  FacebookIcon,
  FilterIcon,
  GlobeIcon,
  HamburgerIcon,
  InstaIcon,
  LikeIcon,
  LockIcon,
  LogoIcon,
  MailIcon,
  MoneyIcon,
  NextItemIcon,
  NotFoundIcon,
  OppositeIcon,
  PhoneIcon,
  PrevItemIcon,
  QuestionIcon,
  SearchIcon,
  ShareIcon,
  ShippingBusIcon,
  ShopCardIcon,
  StarIcon,
} from "../../assets/icons";

export const HomePageComponent = (): ReactElement => {
  return (
    <div>
      <div>
        <LogoIcon />
        <PhoneIcon />
        <SearchIcon />
        <ShopCardIcon />
        <PrevItemIcon />
        <NextItemIcon />
        <LikeIcon />
        <EyeIcon />
        <OppositeIcon />
        <StarIcon />
        <StarIcon stroke="#A7A7A7" />
        <StarIcon stroke="#FFCB2F" />
        <ShippingBusIcon />
        <MoneyIcon />
        <LockIcon />
        <FacebookIcon />
        <InstaIcon />
        <MailIcon />
        <HamburgerIcon />
        <CancelIcon />
        <FilterIcon />
        <ColumnsIcon />
        <ColumnsIcon active />
        <ColumnsIcon active count={2} />
        <ColumnsIcon count={2} />
        <ColumnsIcon active count={3} />
        <ColumnsIcon count={3} />
        <ColumnsIcon active count={4} />
        <ColumnsIcon count={4} />
        <ColumnsIcon active count={5} />
        <ColumnsIcon count={5} />
        <QuestionIcon />
        <ShareIcon />
        <GlobeIcon />
        <DeleteIcon />
        <NotFoundIcon />
      </div>
    </div>
  );
};
