import { ReactElement } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Carusel, ProductCard, ShowCaseCard, LikedBrands } from "@/components";

import { useFetch } from "@/utils/api"
import { products, showCase } from "@/utils/mocks"


export const Home = (): ReactElement => {
  const productArr = useFetch<AxiosResponse, AxiosError>(["products"], "products/")

  return (
    <div className="">
      <Carusel />
      <br />
      <br />

      <div className="flex max-md:flex-col gap-10 mb-10">
        <ShowCaseCard
          key={showCase[0].title}
          title={showCase[0].title}
          img={showCase[0].img}
          link={showCase[0].link}
          titlePosition="top"
          className="md:w-1/2 "
        />
        <div className="md:w-1/2 flex flex-col gap-y-10">
          <ShowCaseCard
            key={showCase[1].title}
            title={showCase[1].title}
            img={showCase[1].img}
            link={showCase[1].link}
            titlePosition="bottom"
            className="md:h-1/2"
            imgClassName=""
          />
          <ShowCaseCard
            key={showCase[2].title}
            title={showCase[2].title}
            img={showCase[2].img}
            link={showCase[2].link}
            titlePosition="bottom"
            className="md:h-1/2"
            imgClassName=""
          />
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className="flex flex-wrap justify-between">
        {
          products.map(item => (
            <ProductCard
                key={Number(item.id)}
                id={+item.id}
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
      </div>

      <br />
      <br />

      <LikedBrands />
    </div>
  );
};
