import { Carusel } from "@/components";
import { HomePageComponent } from "@/components/any";
import { ShowCaseCard } from "@/components/common";
import { ReactElement } from "react";

const HomePage = (): ReactElement => {
  const a = [
    {title: "Coats", link: {label: "explore", href:"kun.uz"}, img: "https://swiperjs.com/demos/images/nature-1.jpg"},
    {title: "Coats", link: {label: "explore", href:"kun.uz"}, img: "https://swiperjs.com/demos/images/nature-1.jpg"},
    {title: "Coats", link: {label: "explore", href:"kun.uz"}, img: "https://swiperjs.com/demos/images/nature-1.jpg"}
  ]
  return (
    <div className="container">
      <Carusel />
      <HomePageComponent/>
      <div className="grid grid-rows-3 grid-flow-col gap-4 border border-red-300">
        <ShowCaseCard 
          key={a[0].title} 
          title={a[0].title} 
          img={a[0].img} 
          link={a[0].link} 
          titlePosition="top"
          className="row-span-3 "
        />
        <ShowCaseCard 
          key={a[0].title} 
          title={a[0].title} 
          img={a[0].img} 
          link={a[0].link} 
          titlePosition="top"
          className=""
        />
        <ShowCaseCard 
          key={a[0].title} 
          title={a[0].title} 
          img={a[0].img} 
          link={a[0].link} 
          titlePosition="top"
          className=""
        />
      </div>
    </div>
  );
};
export default HomePage;
