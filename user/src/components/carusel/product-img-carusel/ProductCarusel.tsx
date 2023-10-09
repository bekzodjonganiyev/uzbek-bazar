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

  // console.log(props.images, "images from carusel")
  return (
    <div className="product-carusel flex gap-5">
      {/*  @Swiper dan foydalanganda @div ga o'rab qo'ysak ko'p muammolarni oldi olinadi. */}

      {/* begin::Swiper thunbnail */}
      <div className="md:block hidden">
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
          {/* {
                        props.images?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <img src={API_URL + item.file} alt='' loading='lazy' />
                            </SwiperSlide>
                        ))
                    } */}
          {images &&
            images.map((e, ind) => (
              <SwiperSlide key={ind}>
                <img src={e} alt="product image" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* end::Swiper thunbnail */}

      {/* begin::Swiper Items shows one by one */}
      <div className="">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          /**
           * @direction => horizontal bo'lganda @SwiperSlide larni
           * o'rab turgan wrapperga @width berilishi shart
           */
          className="product-image xl:w-[500px] lg:w-[400px] md:w-[300px] w-72"
          direction="horizontal"
        >
          {/* {
                        props.images?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <img src={item.file} alt='' loading='lazy' />
                            </SwiperSlide>
                        ))
                    } */}
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
          </SwiperSlide>
        </Swiper>
        {/* end::Swiper Items shows one by one */}
      </div>
    </div>
  );
};
