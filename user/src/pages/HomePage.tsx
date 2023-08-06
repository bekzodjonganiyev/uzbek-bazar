import { ReactElement } from "react";

import { Carusel, ProductCard, ShowCaseCard } from "@/components";
// import { HomePageComponent } from "@/components/any";

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

      <br />
      <br />

      <ProductCard 
          key={1}
          img="https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247" 
          price="$300"
          oldPrice="$400"
          discount="-40%"
          productName="Oka bu palto"
          newBadge
          // rating
      />

      <br />
      <br />

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
