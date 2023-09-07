import { ReactElement, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Carusel, ProductCard, ShowCaseCard, LikedBrands } from "@/components";

import { useFetch } from "@/utils/api";
import { showCase } from "@/utils/mocks"
import { CustomSuspanse } from "@/components/common";
import { SkeletonLoader } from "@/components/loaders";


export const Home = (): ReactElement => {
  const [tabs, setTabs] = useState<{ title: string, id: number | undefined }>({ title: "", id: 1 })
  const productArr = useFetch<AxiosResponse, AxiosError>(["products", tabs.title], `products/?type=${tabs.title}`)

  console.log(productArr.data?.data.results)
  return (
    <div className="">
      <Carusel />
      <br />
      <br />

      <div className="flex max-md:flex-col gap-10 mb-10">
        <ShowCaseCard
          key={showCase[0].title}
          type={showCase[0].type}
          title={showCase[0].title}
          img={showCase[0].img}
          link={showCase[0].link}
          titlePosition="top"
          className="md:w-1/2 "
        />
        <div className="md:w-1/2 flex flex-col gap-y-10">
          <ShowCaseCard
            key={showCase[1].title}
            type={showCase[1].type}
            title={showCase[1].title}
            img={showCase[1].img}
            link={showCase[1].link}
            titlePosition="bottom"
            className="md:h-1/2"
            imgClassName=""
          />
          <ShowCaseCard
            key={showCase[2].title}
            type={showCase[2].type}
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

      <div>
        <div className="flex items-center justify-center gap-10 mb-10">
          {/* -----Product type 1----- */}
          <button
            className={`${tabs.id === 1 ? "border-b-2 border-black font-bold" : ""} text-primary pb-1`}
            onClick={() => setTabs({ title: "wedding", id: 1 })}
          >
            Best Sellers
          </button>

          {/* -----Product type 2----- */}
          <button
            className={`${tabs.id === 2 ? "border-b-2 border-black font-bold" : ""} text-primary pb-1`}
            onClick={() => setTabs({ title: "new-arrivals", id: 2 })}
          >
            New Arrivals
          </button>

          {/* -----Product type 3----- */}
          <button
            className={`${tabs.id === 3 ? "border-b-2 border-black font-bold" : ""} text-primary pb-1`}
            onClick={() => setTabs({ title: "uniform", id: 3 })}
          >
            Sale
          </button>
        </div>
        <CustomSuspanse
          loading={productArr.isLoading}
          loadingFallback={<SkeletonLoader />}
          error={productArr.isError}
          errorFallback={"Error"}
        >
          <div className="flex flex-wrap justify-between">
            {
              productArr.data?.data.results.map((item: any )=> (
                <ProductCard
                  key={Number(item.id)}
                  id={+item.id}
                  img={item.photo}
                  price={item.price}
                  oldPrice={item.oldPice}
                  discount={item.discount}
                  productName={item.name}
                  newBadge={item.newBadge}
                  rating={item.rating ?? 2}
                />
              ))
            }
          </div>
        </CustomSuspanse>

      </div>


      <br />
      <br />

      <LikedBrands />
    </div>
  );
};
