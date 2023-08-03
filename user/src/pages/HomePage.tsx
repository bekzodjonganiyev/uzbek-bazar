import { ReactElement } from "react";

import { Carusel } from "@/components";
import { HomePageComponent } from "@/components/any";
import { ShowCaseCard } from "@/components/common";

import img1 from "@/assets/images/3.png"
import img2 from "@/assets/images/2.png"

const HomePage = (): ReactElement => {
  const a = [
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img1 },
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img2 },
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img2 }
  ]
  return (
    <div className="container">
      <Carusel />
      <HomePageComponent />
      <div className="flex max-md:flex-col gap-10 mb-10">
        <ShowCaseCard
          key={a[0].title}
          title={a[0].title}
          img={a[0].img}
          link={a[0].link}
          titlePosition="top"
          className="md:w-1/2 "
        />
        <div className="md:w-1/2 flex flex-col gap-y-10">
          <ShowCaseCard
            key={a[1].title}
            title={a[1].title}
            img={a[1].img}
            link={a[1].link}
            titlePosition="bottom"
            className="md:h-1/2"
            imgClassName=""
          />
          <ShowCaseCard
            key={a[2].title}
            title={a[2].title}
            img={a[2].img}
            link={a[2].link}
            titlePosition="bottom"
            className="md:h-1/2"
            imgClassName=""
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
