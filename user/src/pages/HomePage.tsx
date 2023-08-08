import { ReactElement } from "react";

import { Carusel, ProductCard, ShowCaseCard, LikedBrands } from "@/components";
import { HomePageComponent } from "@/components/any";

import img1 from "@/assets/images/3.png"
import img2 from "@/assets/images/2.png"

const HomePage = (): ReactElement => {
  const a = [
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img1 },
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img2 },
    { title: "Coats", link: { label: "Explore", href: "kun.uz" }, img: img2 }
  ]

  const b = [
    { 
      id: 1, 
      img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247", 
      price: "$300", 
      oldPice: null,
      newBadge: true,
      rating: false,
      discount: null,
      productName: "Malqa Pullover"
    },
    { 
      id: 2, 
      img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247", 
      price: "$300", 
      oldPice: "$330",
      newBadge: true,
      rating: false,
      discount: null,
      productName: "Malqa Pullover"
    },
    { 
      id: 3, 
      img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247", 
      price: "$300", 
      oldPice: null,
      newBadge: false,
      rating: false,
      discount: "-40%",
      productName: "Malqa Pullover"
    },
    { 
      id: 4, 
      img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247", 
      price: "$300", 
      oldPice: "$330",
      newBadge: false,
      rating: false,
      discount: "-40%",
      productName: "Malqa Pullover Malqa Pullover Malqa Pullover Malqa Pullover" 
    },
  ]

  return (
    <div className="container">
      <Carusel />
      <HomePageComponent />
      <br />
      <br />

      {/* <div className="grid grid-cols-4 max-md:grid-cols-1 gap-10">
        {
          b.map(item => (
            <ProductCard
                key={Number(item.id)}
                img={item.img} 
                price={item.price}
                oldPrice={item.oldPice}
                discount={item.discount}
                productName={item.productName}
                newBadge={item.newBadge}
                rating={item.rating}
            />
          ))
        }
      </div> */}

      <br />
      <br />

      <LikedBrands />

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
