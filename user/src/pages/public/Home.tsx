import { ReactElement, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating'

import { Carusel, ProductCard, ShowCaseCard, LikedBrands, ProductSkeleton } from "@/components";
import { CustomSuspanse } from "@/components/common";
import { NextItemIcon, PrevItemIcon } from "@/assets/icons";

import { useFetch } from "@/utils/api";
import { showCase } from "@/utils/mocks"
import { productListType } from "@/interfaces/product"

export const Home = (): ReactElement => {
  const [tabs, setTabs] = useState<{ title: string, id: number | undefined }>({ title: "", id: 1 })
  const productArr = useFetch<AxiosResponse, AxiosError>(["products", tabs.title], `products/?type=${tabs.title}`, false)
  const reviews = useFetch<AxiosResponse, AxiosError>(["reviews"], "reviews/", false)

  return (
    <>
      <div className="">
        <Carusel />
        <br />
        <br />

        {/* TODO - static categorylarni backdan olib kelishim kerak. */}
        <div className="flex max-md:flex-col gap-10 mb-10">
          <ShowCaseCard
            // key={showCase[0].title}
            type={showCase[0].type}
            title={showCase[0].title}
            img={showCase[0].img}
            link={showCase[0].link}
            titlePosition="top"
            className="md:w-1/2 "
          />
          <div className="md:w-1/2 flex flex-col gap-y-10">
            <ShowCaseCard
              // key={showCase[1].title}
              type={showCase[1].type}
              title={showCase[1].title}
              img={showCase[1].img}
              link={showCase[1].link}
              titlePosition="bottom"
              className="md:h-1/2"
              imgClassName=""
            />
            <ShowCaseCard
              // key={showCase[2].title}
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
            loadingFallback={
              <div className='flex flex-wrap justify-between gap-10 py-10'>
                <ProductSkeleton limit={12} />
              </div>}
            error={productArr.isError}
            errorFallback={"Error"}
          >
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-5">
              {
                productArr.data?.data.results.slice(0, 10).map((item: productListType) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    photo={item.photo}
                    price={item.price}
                    new_price={item.new_price}
                    discount={item.discount}
                    name={item.name}
                    // newBadge={item.newBadge}
                    rating={item.rating ?? 2}
                    material={item.material}
                    minimum_order_count={item.minimum_order_count}
                    season={item.season}
                  />
                ))
              }
            </div>
          </CustomSuspanse>

        </div>


        <br />
        <br />

        <LikedBrands />

        {/* Reivew in carusel */}
        <div className='same-products mt-10'>
          <div className='flex max-md:flex-col max-md:gap-5 items-center justify-between relative mb-5'>
            <h3 className='text-2xl font-medium max-sm:text-center'>Mijozlar fikri</h3>
            <div className='flex items-center gap-3 relative'>
              <button className="swiper-button-next"><NextItemIcon /></button>
              <button className="swiper-button-prev"><PrevItemIcon /></button>
            </div>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            // freeMode={true}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={false}
            modules={[Pagination, Navigation]}
            className=""
            breakpoints={{
              120: {
                slidesPerView: 1,
                spaceBetween: 24,
                resistanceRatio: 0.85
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 24,
                resistanceRatio: 0.85
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 28,
                resistanceRatio: 0.85
              },
              980: {
                slidesPerView: 4,
                spaceBetween: 28,
                resistanceRatio: 0.85
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
                resistanceRatio: 0
              },
            }}
          >
            {
              reviews.data?.data.results.map((item: any) => (
                <SwiperSlide className="shadow-md p-2 my-5 rounded-md">
                  <div className='flex gap-2 items-center'>
                    <img className="w-10 h-10 rounded-full" src={item.client.avatar ?? "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/17f192f61c30f492e1ac218ca4666b68?_a=AQAEufR"} alt='Avatar' />
                    <div className=''>
                      <h4>
                        {item.client.full_name}
                      </h4>
                      <Rating initialValue={item.rating ?? 2} size={20} readonly />
                    </div>
                  </div>
                  <div className=''>
                    <h5 className="my-3">{item.product.name}</h5>
                    <p>
                      {item.comment}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <br />
        <br />
      </div></>
  );
};
