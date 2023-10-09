import { ReactElement, useState, Fragment } from 'react'
import { Link, useParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import { Rating } from 'react-simple-star-rating'


import { Button } from '@/components/ui/button'
import { EyeIcon, HumanIcon, LikeIcon, QuestionIcon, ShareIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'
import { ProductCarusel, ProductsListCarusel, ProductReview } from '@/components'

import { useFetch } from "@/utils/api"

// type Props = {}

export const ProductView = (/*props: Props*/): ReactElement => {
    const { id } = useParams()
    const productById = useFetch<AxiosResponse, AxiosError>(["product-by-id", id], `products/${id}`)
    const sameProducts = useFetch<AxiosResponse, AxiosError>(["same-products", id], `products/?type=${productById.data?.data.type}&season=${productById.data?.data.season}`, productById.isSuccess)

    const [color, setColor] = useState<{ color: string, id: number | undefined }>({ color: "", id: undefined })
    const [size, setSize] = useState<{ size: string, id: number | undefined }>({ size: "", id: undefined })
    const [tabs, setTabs] = useState<{ data: ReactElement, id: number | undefined }>({ data: <p></p>, id: 1 })

    const reviwes = [1, 2, 3, 4]
    const questions = [1, 2, 3, 4]

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
                    {/* Product images carusel */}
                    <ProductCarusel />

                    {/* Product starter infos */}
                    <div className='flex flex-col gap-5 md:w-1/2 mx-auto'>
                        {/* Name */}
                        <h1 className='text-2xl font-bold line-clamp-1'>{productById.data?.data.name}</h1>

                        {/* Description */}
                        <p className='line-camp-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>{productById.data?.data.desc}</p>

                        {/* Rating */}
                        <Rating initialValue={productById.data?.data.rating ?? 2} size={20} readonly />

                        {/* Price */}
                        <p className='flex gap-2'>
                            <span>{productById.data?.data.price}</span>
                            <span className='line-through'>{productById.data?.data.price}</span>
                        </p>

                        {/* Head count */}
                        <div className='flex items-center gap-2'>
                            <span><EyeIcon /></span>
                            <p>32 people are looking at this product</p>
                        </div>
                        <hr />

                        {/* Color */}
                        <div>
                            <p className='mb-[5px]'>Color:</p>
                            <div className="flex gap-2">
                                {
                                    productById.data?.data.variables.map((item: any) => (
                                        <div className={`border-black rounded-full ${color.id === item.id ? "border-2" : ""}`}>
                                            <button
                                                style={{ backgroundColor: item.color }}
                                                key={item.id}
                                                className={`p-5 border-2 rounded-full`}
                                                onClick={() => setColor({ color: item.color, id: item.id })}
                                            ></button>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>

                        {/* Size */}
                        <div>
                            <p className='mb-[5px]'>Size:</p>
                            <div className='space-x-3'>
                                {
                                    productById.data?.data.size.map((item: any) => (
                                        <button
                                            key={item.id}
                                            className={`rounded-md p-2 border-2 ${size.id === item.id ? "border-black" : ""}`}
                                            onClick={() => setSize({ size: item, id: item.id })}
                                        >
                                            {item.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Add to cart */}
                        <Button variant={'default'} className='rounded-none py-5'>Savatga qo’shish</Button>

                        <div className='flex gap-5'>
                            {/* Add to wishlist */}
                            <button>
                                <span className='flex items-center gap-1'><LikeIcon color='black' /><p>Wishlist</p></span>
                            </button>

                            {/* Ask question */}
                            <button>
                                <span className='flex items-center gap-2'><QuestionIcon /><p>Ask question</p></span>
                            </button>

                            {/* Share this product */}
                            <button>
                                <span className='flex items-center gap-2'><ShareIcon /><p>Share</p></span>
                            </button>
                        </div>
                        <hr />

                        {/* Seller profile */}
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
            {
                sameProducts.isLoading 
                ? ""
                : <ProductsListCarusel array={sameProducts.data?.data.results} title="O'xshash maxsulotlar" prevElClass='.swiper-button-prev' nextElClass='.swiper-button-next'/> 
            }
            {/* begin:SAME PRODUCTS */}

            {/* begin:RECENTLT VIEWED PRODUCTS */}
            <ProductsListCarusel array={[]} title="Yaqinda ko'rib chiqilgan" prevElClass='.swiper-button-prev-1' nextElClass='.swiper-button-next-1' />
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