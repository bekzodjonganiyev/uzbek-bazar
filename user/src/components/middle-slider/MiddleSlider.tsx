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



export function MiddleSlider() {

    interface Props {
        items: { title: string, value: string, content: string[] }[],
        className: string
    }


    return (
        <>
            <div className='middleSliderWrapper'>
                <div>
                    <h3>Mijozlar fikri</h3>
                </div>
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
                            <img src={middleSwiperCardsIcon1} alt='Avatar' />
                            <div className='middleSwiperCardsHeading'>
                                <h4>
                                    John F.
                                </h4>
                                <div className='middleSwiperCardsStars'>
                                    <img src={middleSwiperCardsStar} alt='star' />
                                </div>
                            </div>
                        </div>
                        <div className='middleSlideCardBody'>
                            <h5>Product name</h5>
                            <p>
                                “Omg! These are adorable. Very comfortable while and fashionable. Brilliant customer support helping with sizing and again with tracking”
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper >
            </div>
        </>
    );
}
