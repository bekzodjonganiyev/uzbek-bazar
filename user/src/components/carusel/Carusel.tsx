import { ReactElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './carusel.css'

import { Button } from "@/components/ui/button"
import { NextItemIcon } from "@/assets/icons";


export const Carusel = (): ReactElement => {
    const a = [
        {
            img: "https://swiperjs.com/demos/images/nature-1.jpg",
            info: {
                type: "New Arrivals",
                titile: "Your dream shop is a click away.",
                desc: "Keep your everyday style chic and on-trend with our selection 20+ styles to choose from."
            }
        },
        {
            img: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            info: {
                type: "New Arrivals",
                titile: "Your dream shop is a click away.",
                desc: "Keep your everyday style chic and on-trend with our selection 20+ styles to choose from."
            }
        },
        {
            img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            info: {
                type: "New Arrivals",
                titile: "Your dream shop is a click away.",
                desc: "Keep your everyday style chic and on-trend with our selection 20+ styles to choose from."
            }
        },
        {
            img: "https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            info: {
                type: "New Arrivals",
                titile: "Your dream shop is a click away.",
                desc: "Keep your everyday style chic and on-trend with our selection 20+ styles to choose from."
            }
        }
    ]

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className=""
            >
                {
                    a.map(item => (
                        <SwiperSlide key={item.img}>
                            <div className="w-full h-[500px] max-xl:h-[500px] max-lg:h-[400px] max-md:h-[300px] max-sm:h-fit text-black flex max-md:flex-col">
                                <div className="md:w-1/2"><img className="w-full h-full object-cover" src={item.img} alt="img" /></div>
                                <div className="md:w-1/2 bg-red-500 flex md:items-center md:justify-center max-lg:p-4">
                                    <div className="text-white w-96">
                                        <p className="pb-4">{item.info.type}</p>
                                        <h1 className="text-4xl pb-4">{item.info.titile}</h1>
                                        <p className="pb-4">{item.info.desc}</p>
                                        <Button size={"lg"} variant={"secondary"} className="bg-white text-black rounded-none flex items-center gap-2"><p>See Collection</p><NextItemIcon width={20} height={20}/></Button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};