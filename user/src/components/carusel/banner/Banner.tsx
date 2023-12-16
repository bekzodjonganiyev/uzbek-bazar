import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { AxiosError, AxiosResponse } from "axios";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './carusel.css'

import { Button } from "@/components/ui/button"
import { NextItemIcon } from "@/assets/icons";
import { CustomSuspanse } from "@/components/common"

import { useFetch } from "@/utils/api"
import { InfinitySpin } from "react-loader-spinner";


export const Carusel = (): ReactElement => {
    const banner = useFetch<AxiosResponse, AxiosError>(["banner"], "banners/", false)

    return (
        <CustomSuspanse
            loading={banner.isLoading}
            loadingFallback={
                <div className="w-full h-[500px] max-xl:h-[500px] max-lg:h-[400px] max-md:h-[300px] max-sm:h-fit text-black flex max-md:flex-col items-center justify-center">
                    <InfinitySpin
                        width='200'
                        color="#4fa94d"
                    />
                </div>
            }
            error={banner.isError}
            errorFallback={"Error"}
        >
            <div className="banner">
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
                        banner.data?.data.results.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="w-full h-[500px] max-xl:h-[500px] max-lg:h-[400px] max-md:h-[300px] max-sm:h-fit text-black flex max-md:flex-col">
                                    <div className="md:w-1/2"><img className="w-full h-full object-cover object-top" src={item.image} alt="img" /></div>
                                    <div className="md:w-1/2 bg-red-500 flex md:items-center md:justify-center max-lg:p-4">
                                        <div className="text-white w-96">
                                            <p className="pb-4">{item.type}</p>
                                            <h1 className="text-4xl pb-4">{item.title}</h1>
                                            {/* <p className="pb-4">{item.info.desc}</p> */}
                                            <Button
                                                size={"lg"}
                                                variant={"secondary"}
                                                className="bg-white text-black rounded-none"
                                            >
                                                <Link to={`catalog/${item.url}`} state={{category_id: item.id}} className="flex items-center gap-2 w-full h-full">
                                                    <p>See Collection</p><NextItemIcon width={20} height={20} />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </CustomSuspanse>
    );
};