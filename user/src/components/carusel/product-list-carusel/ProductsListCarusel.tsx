import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import "./product-list-carusel.css"

import { ProductCard } from '@/components/product-card/ProductCard';
import { NextItemIcon, PrevItemIcon } from '@/assets/icons';


type Props = {
    array: any[],
    title: string
    prevElClass: string
    nextElClass: string
}

export const ProductsListCarusel = (props: Props) => {
    return (
        <div className='same-products' key={1}>
            <div className='flex max-md:flex-col max-md:gap-5 items-center justify-between relative mb-5'>
                <h3 className='text-2xl font-medium max-sm:text-center'>{props.title}</h3>
                <div className='flex items-center gap-3 relative'>
                    <button className={`${props.nextElClass}`}><PrevItemIcon /></button>
                    <button className={`${props.prevElClass}`}><NextItemIcon /></button>
                </div>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}
                navigation={{
                    prevEl: `${props.prevElClass}`,
                    nextEl: `${props.nextElClass}`,
                }}
                pagination={false}
                modules={[FreeMode, Pagination, Navigation]}
            >
                {
                    props.array.map((i: any) => (
                        <SwiperSlide key={i.id}>
                            <ProductCard
                                key={Number(i.id)}
                                id={+i.id}
                                img={i.photo}
                                price={i.price}
                                oldPrice={i.oldPice}
                                discount={i.discount}
                                productName={i.name}
                                newBadge={i.newBadge}
                                rating={i.rating}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}