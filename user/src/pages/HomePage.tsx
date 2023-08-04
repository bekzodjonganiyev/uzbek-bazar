import { Carusel } from "@/components";
import { HomePageComponent } from "@/components/any";
import { MiddleSlider } from "@/components/middle-slider/MiddleSlider";
import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <div className="">
      {/* <Carusel />
      <HomePageComponent/> */}
      <MiddleSlider 
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, assumenda!"
          name="Palonchi"
          img="https://i.pinimg.com/236x/2c/ff/a5/2cffa591bd7c6f19e786b4a3b94f83ec.jpg"
          productName="Arava"
          ranking={3}
      />

    </div>
  );
};
export default HomePage;
