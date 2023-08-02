import { ReactElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './carusel.css'


export const Carusel = (): ReactElement => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full h-[500px] bg-red-300 text-black flex max-md:flex-col">
                    <div className="md:w-1/2"><img className="w-full h-full object-cover" src="https://choko.uz/media/banner/solfi_1RZ3tUA.jpg" alt="" /></div>
                    <div className="md:w-1/2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos laudantium mollitia sapiente? Facere molestiae, eius cupiditate quisquam enim deserunt?
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};