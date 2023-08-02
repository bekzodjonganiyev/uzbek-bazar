import { ReactElement, useState } from "react";
import { DownIcon } from "@/assets/icons";

type Props = {
  title: string;
  items: string[];
};

export const CustomListShower = ({ title, items }: Props): ReactElement => {
  const [show, setShow] = useState<boolean>();
  return (
    <div className="xs:w-full md:w-1/3 mt-3 border">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => { setShow(!show); console.log("first render") }}
      >
        <h2 className="text-black-900 font-space-grotesk font-bold text-sm leading-6">
          {title}
        </h2>
        <div className="block md:hidden">
          <DownIcon />
        </div>
      </div>
      <div className={`${show ? "block md:block" : "hidden md:block"} h-0`}>
        {items.map((e, ind) => (
          <span
            className="block font-inter text-base font-normal leading-6"
            key={ind}
          >
            {e}
          </span>
        ))}
      </div>
      <hr className="md:hidden mt-3" />
    </div>
  );
};
