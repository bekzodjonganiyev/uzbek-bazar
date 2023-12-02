import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./product-carusel.css";

type Props = {
  images?: string[];
};

export const ProductCarusel = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="product-carusel flex gap-3 md:w-1/2 w-full">
      {/*  @Swiper dan foydalanganda @div ga o'rab qo'ysak ko'p muammolarni oldi olinadi. */}

      {/* begin::Swiper thunbnail */}
      <div className="min-[400px]:block hidden">
        <Swiper
          onSwiper={(a) => setThumbsSwiper(a)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          /**
           * @direction => vertical bo'lganda @SwiperSlide larni
           * o'rab turgan wrapperga @height berilishi shart
           */
          className="thumbs"
          direction="vertical"
        >
          {
            images
              ? images.map((e, ind) => (
                <SwiperSlide key={ind}>
                  <img src={e} alt="product image" />
                </SwiperSlide>
              ))
              : null
          }
        </Swiper>
      </div>
      {/* end::Swiper thunbnail */}

      {/* begin::Swiper Items shows one by one */}
      {/* <div className="w-full oka"> */}
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          /**
           * @direction => horizontal bo'lganda @SwiperSlide larni
           * o'rab turgan wrapperga @width berilishi shart
           */
          className="product-image h-full w-full"
          direction="horizontal"
        >
          {
            images
              ? images.map((e, ind) => (
                <SwiperSlide key={ind}>
                  <img className="object-cover object-top h-full w-full" src={e} alt="product image" />
                </SwiperSlide>
              ))
              : null
          }
        </Swiper>
        {/* end::Swiper Items shows one by one */}
      {/* </div> */}
      {/* begin::Swiper Items shows one by one */}
    </div>
  );
};
