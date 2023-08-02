import { Carusel } from "@/components";
import { HomePageComponent } from "@/components/any";
import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  return (
    <div className="">
      <Carusel />
      <HomePageComponent/>
    </div>
  );
};
export default HomePage;
