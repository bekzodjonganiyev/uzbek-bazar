import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './MiddleSlider.css';

// import required modules
import { Pagination } from 'swiper/modules';

// import assets
import middleSwiperCardsIcon1 from '../../assets/middleSwiperCardsIcon1.png';
import middleSwiperCardsStar from '../../assets/middleSwiperCardsStar.png';


interface Props {
    img: string,
    name: string,
    ranking: 1 | 2 | 3 | 4 | 5,
    productName: string,
    desc: string
}
export function MiddleSlider({img, name, ranking, desc, productName}: Props) {

    return (
        <>
            <div className='middleSliderWrapper shadow-lg'>
                {/* <div>
                    <h3>Mijozlar fikri</h3>
                </div> */}
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="middleSliderSwiper"
                    style={{
                        color: 'black',
                        width: '100%'
                    }}
                >
                    <SwiperSlide>
                        <div className='middleSlideCardHeader'>
                            <img src={img} alt='Avatar' />
                            <div className='middleSwiperCardsHeading'>
                                <h4>
                                    {name}
                                </h4>
                                <div className='middleSwiperCardsStar'>
                                    <img src={middleSwiperCardsStar} alt='star' />
                                </div>
                            </div>
                        </div>
                        <div className='middleSlideCardBody'>
                            <h5>{productName}</h5>
                            <p>
                                {desc}
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper >
            </div>
        </>
    );
}
