import { ReactElement, useState, Fragment } from 'react'
import { Link, useParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './product-view.css';

import { Button } from '@/components/ui/button'
import { EyeIcon, HumanIcon, LikeIcon, NextItemIcon, PrevItemIcon, QuestionIcon, ShareIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'
import { ProductCard, ProductCarusel, ProductReview } from '@/components'

import { useFetch } from "@/utils/api"

type Props = {}

export const ProductView = (props: Props): ReactElement => {
    const { id } = useParams()
    const productById = useFetch<AxiosResponse, AxiosError>(["product-by-id", id], `products/${id}`)

    const [color, setColor] = useState<{ color: string, id: number | undefined }>({ color: "", id: undefined })
    const [size, setSize] = useState<{ size: string, id: number | undefined }>({ size: "", id: undefined })
    const [tabs, setTabs] = useState<{ data: ReactElement, id: number | undefined }>({ data: <p></p>, id: 1 })

    const reviwes = [1, 2, 3, 4]
    const questions = [1, 2, 3, 4]
    const sameProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className='flex flex-col gap-16 py-10 w-[90%] mx-auto'>

            {/* begin:PRODUCT STARTER INFO */}
            <CustomSuspanse
                loading={productById.isLoading}
                error={productById.isError}
                loadingFallback={"Loading"}
                errorFallback={"Error"}
            >
                <div className='flex max-md:flex-col gap-10 justify-between'>
                    <ProductCarusel />
                    <div className='flex flex-col gap-5 md:w-1/2 mx-auto'>
                        <h1 className='text-2xl font-bold line-clamp-1'>{productById.data?.data.name}</h1>
                        <p className='line-camp-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>{productById.data?.data.desc}</p>
                        <p>rating</p>
                        <p className='flex gap-2'>
                            <span>{productById.data?.data.price}</span>
                            <span className='line-through'>{productById.data?.data.price}</span>
                        </p>
                        <div className='flex items-center gap-2'>
                            <span><EyeIcon /></span>
                            <p>32 people are looking at this product</p>
                        </div>
                        <hr />
                        <div>
                            <p className='mb-[5px]'>Color:</p>
                            <div className='space-x-1'>
                                {
                                    productById.data?.data.variables.map((item: any) => (
                                        <button
                                            style={{ backgroundColor: item.color }}
                                            className={`p-5 rounded-full border-black ${color.id === item.id ? "border-2" : ""}`}
                                            onClick={() => setColor({ color: item.color, id: item.id })}
                                        >
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <p className='mb-[5px]'>Size:</p>
                            <div className='space-x-3'>
                                {
                                    productById.data?.data.variables.map((item: any) => (
                                        <button
                                            className={`rounded-md p-2 border-2 ${size.id === item.id ? "border-black" : ""}`}
                                            onClick={() => setSize({ size: item.color, id: item.id })}
                                        >
                                            {item.size}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <Button variant={'default'} className='rounded-none py-5'>Savatga qo’shish</Button>
                        <div className='flex gap-5'>
                            <button>
                                <span className='flex items-center gap-1'><LikeIcon color='black' /><p>Wishlist</p></span>
                            </button>
                            <button>
                                <span className='flex items-center gap-2'><QuestionIcon /><p>Ask question</p></span>
                            </button>
                            <button>
                                <span className='flex items-center gap-2'><ShareIcon /><p>Share</p></span>
                            </button>
                        </div>
                        <hr />
                        <div className='flex items-center gap-2'>
                            <span className='flex items-end gap-2'>
                                <HumanIcon />
                                <text className='font-semibold'>Sotuvchi:</text>
                            </span>
                            <Link to="" className='text-stone-400 underline'>Terro Pro</Link>
                        </div>
                    </div>
                </div>
            </CustomSuspanse>
            {/* begin:PRODUCT STARTER INFO */}

            {/* begin:PRODUCT ADDITIONAL INFO */}
            <div>
                <div className='border-b flex gap-10'>
                    {/* -----Description----- */}
                    <button
                        className={`${tabs.id === 1 ? "border-b-2 border-black" : ""}  pb-1`}
                        onClick={() => setTabs(
                            {
                                data: <ProductView_Description data='long description' />,
                                id: 1
                            }
                        )}
                    >
                        Description
                    </button>

                    {/* -----Additional Info----- */}
                    <button
                        className={`${tabs.id === 2 ? "border-b-2 border-black" : ""}  pb-1`}
                        onClick={() => setTabs(
                            {
                                data: <ProductView_Info data='Additional info' />,
                                id: 2
                            }
                        )}
                    >
                        Additional Info
                    </button>

                    {/* -----Reviwes(23)----- */}
                    <button
                        className={`${tabs.id === 3 ? "border-b-2 border-black" : ""}  pb-1`}
                        onClick={() => setTabs(
                            {
                                data: <ProductView_Review arr={reviwes} />,
                                id: 3
                            })}
                    >
                        Reviwes(23)
                    </button>

                    {/* -----Questions----- */}
                    <button
                        className={`${tabs.id === 4 ? "border-b-2 border-black" : ""}  pb-1`}
                        onClick={() => setTabs(
                            {
                                data: <ProductView_Question arr={questions} />,
                                id: 4
                            })}
                    >
                        Questions
                    </button>
                </div>
                <div className='py-10'>
                    {
                        tabs.data
                    }
                </div>
            </div>
            {/* begin:PRODUCT ADDITIONAL INFO */}

            {/* begin:SAME PRODUCTS */}
            <div className='same-products'>
                <div className='flex items-center justify-between relative mb-10'>
                    <h3 className='text-2xl font-medium'>O'xshash maxsulotlar</h3>
                    <div className='flex items-center gap-3'>
                        <button className="swiper-button-prev"><PrevItemIcon /></button>
                        <button className="swiper-button-next"><NextItemIcon /></button>
                    </div>
                </div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    freeMode={true}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={false}
                    modules={[FreeMode, Pagination, Navigation]}
                >
                    {
                        sameProducts.map((i: any) => (
                            <SwiperSlide>
                                <ProductCard
                                    key={Number(i)}
                                    id={+i.id}
                                    img={i.img}
                                    price={i.price}
                                    oldPrice={i.oldPice}
                                    discount={i.discount}
                                    productName={i.productName}
                                    newBadge={i.newBadge}
                                    rating={i.rating}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            {/* begin:SAME PRODUCTS */}

            {/* begin:RECENTLT VIEWED PRODUCTS */}
            <div className='same-products'>
                <div className='flex items-center justify-between relative mb-10'>
                    <h3 className='text-2xl font-medium'>O'xshash maxsulotlar</h3>
                    <div className='flex items-center gap-3'>
                        <button className="swiper-button-prev"><PrevItemIcon /></button>
                        <button className="swiper-button-next"><NextItemIcon /></button>
                    </div>
                </div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    freeMode={true}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={false}
                    modules={[FreeMode, Pagination, Navigation]}
                >
                    {
                        sameProducts.map((i: any) => (
                            <SwiperSlide>
                                <ProductCard
                                    key={Number(i)}
                                    id={+i.id}
                                    img={i.img}
                                    price={i.price}
                                    oldPrice={i.oldPice}
                                    discount={i.discount}
                                    productName={i.productName}
                                    newBadge={i.newBadge}
                                    rating={i.rating}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
            {/* begin:RECENTLT VIEWED PRODUCTS */}
        </div>
    )
}

type DescriptionProps = {
    data: string
}
function ProductView_Description(props: DescriptionProps) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.data }} />
    )
}

type InfoProps = {
    data: string
}
function ProductView_Info(props: InfoProps) {
    return (
        <div>{props.data}</div>
    )
}

type ReviewProps = {
    arr: any[]
}
function ProductView_Review(props: ReviewProps) {
    return (
        <Fragment>
            {
                props.arr.map((i) => (
                    <ProductReview
                        key={i}
                        date={new Date().toString()}
                        img='https://api-qabul.tkti.uz/uploads/file-1693294629138.jpg'
                        name='Oklar'
                        desc='oiuoihoiuhoiuhoiu'
                        rating={3}
                    />
                ))
            }
        </Fragment>
    )
}

type QuestionProps = {
    arr: any[]
}
function ProductView_Question(props: QuestionProps) {
    const a = [1, 2, 3]
    return (
        <div>
            {
                props.arr.map((i: any) => (
                    <div className='flex flex-col mt-10 pb-5 border-b clgr' key={i}>
                        <div className='flex gap-5'>
                            <p className=''>Question</p>
                            <p className='font-bold'>What type of material is it and what are the wash care instructions (machine washable)?</p>
                        </div>
                        <div className='flex gap-5'>
                            <p className=''>Answer</p>
                            <div className='flex flex-col gap-3'>
                                {
                                    a.map(i => (
                                        <div className='flex flex-col gap-2' key={i}>
                                            <p className='font-medium'>Machine wash, cold water. Dry flat. Light weight cotton polyester blend. Looks good and is well made</p>
                                            <span className='text-stone-300 text-sm'>By Natalie Foster on March 2023</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}