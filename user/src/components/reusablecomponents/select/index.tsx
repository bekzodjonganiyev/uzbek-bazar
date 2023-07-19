import { Select } from "antd";
import { ReactElement } from "react";
import { EnFlagIcon, RuFlagIcon, UzFlagIcon } from "../../../assets/icons";
const { Option } = Select;

export const LanguageSelect = (): ReactElement => {
  return (
    <Select defaultValue="en" bordered={false}>
      <Option value="uz" className="flex items-center justify-between">
        <span className="inline-block">
          <UzFlagIcon />
        </span>
        <span className="ms-2">uzbek</span>
      </Option>
      <Option value="en" className="flex items-center justify-between">
        <span className="inline-block">
          <EnFlagIcon />
        </span>
        <span className="ms-2">English</span>
      </Option>
      <Option value="ru" className="flex items-center justify-between">
        <span className="inline-block">
          <RuFlagIcon />
        </span>
        <span className="ms-2">Russian</span>
      </Option>
    </Select>
  );
};

export const CurrencySelect = (): ReactElement => {
  return (
    <Select defaultValue="usd" bordered={false}>
      <Option value="usd">USD</Option>
      <Option value="eur">EUR</Option>
      <Option value="gbp">GBP</Option>
    </Select>
  );
};
