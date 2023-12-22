import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "./product-list-carusel.css"

import { ProductCard } from '@/components/product-card/ProductCard';
import { productListType } from '@/interfaces/product';


type Props = {
    array: productListType[],
    title: string
    prevElClass: string
    nextElClass: string
    prevElIcon?: ReactNode
    nextElIcon?: ReactNode

}
// TODO - navigation buttonlar bosilganda carusel indeksi almashmayapti
export const ProductsListCarusel = (props: Props) => {
    return (
        <div className='same-products' key={1}>
            <div className='flex max-md:flex-col max-md:gap-5 items-center justify-between relative mb-5'>
                <h3 className='text-2xl font-medium max-sm:text-center'>{props.title}</h3>
                <div className='flex items-center gap-3 relative'>
                    <button className={`${props.prevElClass}`}>{props.prevElIcon}</button>
                    <button className={`${props.nextElClass}`}>{props.nextElIcon}</button>
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                // freeMode={true}
                navigation={{
                    prevEl: `${props.prevElClass}`,
                    nextEl: `${props.nextElClass}`,
                }}
                pagination={false}
                modules={[Pagination, Navigation]}
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
                    props.array.map((item: productListType) => (
                        <SwiperSlide key={item.id}>
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
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}