import { Carusel } from "@/components";
import { HomePageComponent } from "@/components/any";
import { MiddleSlider } from "@/components/middle-slider/MiddleSlider";
import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <div className="">
      {/* <Carusel />
      <HomePageComponent/> */}
      <MiddleSlider />
    </div>
  );
};
export default HomePage;
