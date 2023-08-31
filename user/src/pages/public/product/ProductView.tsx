import { ReactElement, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"

import { Button } from '@/components/ui/button'
import { EyeIcon, HumanIcon, LikeIcon, QuestionIcon, ShareIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'
import { ProductCarusel } from '@/components'

import { useFetch } from "@/utils/api"

type Props = {}

export const ProductView = (props: Props): ReactElement => {
    const { id } = useParams()
    const productById = useFetch<AxiosResponse, AxiosError>(["product-by-id", id], `products/${id}`)

    const [ color, setColor ] = useState<{ color: string, id: number | undefined }>({ color: "", id: undefined })

    return (
        <div className='flex flex-col gap-10 py-10'>
            {/* begin:PRODUCT STARTER INFO */}
            <CustomSuspanse
                loading={productById.isLoading}
                error={productById.isError}
                loadingFallback={"Loading"}
                errorFallback={"Error"}
            >
                <div className='flex max-md:flex-col gap-10 justify-between w-[90%]'>
                    <ProductCarusel />
                    <div className='flex flex-col gap-5 w-1/2'>
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
                            <span className=''>Color:</span>
                            <div className='space-x-1'>
                                {
                                    productById.data?.data.variables.map((item: any) => (
                                        <button 
                                            style={{ backgroundColor: item.color }} 
                                            className={`p-5 rounded-full border-black ${color.id === item.id ? "border-2" : ""}`}
                                            onClick={() => setColor({color: item.color, id:item.id})}
                                        >
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <span className=''>Size:</span>
                            <div className='space-x-3'>
                                {
                                    productById.data?.data.variables.map((item: any) => (
                                        <button className='rounded-md p-2 border-2'>
                                            {item.size}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <Button>Savatga qo’shish</Button>
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
            <div></div>
            {/* begin:PRODUCT ADDITIONAL INFO */}

            {/* begin:SAME PRODUCTS */}
            <div></div>
            {/* begin:SAME PRODUCTS */}

            {/* begin:RECENTLT VIEWED PRODUCTS */}
            <div></div>
            {/* begin:RECENTLT VIEWED PRODUCTS */}
        </div>
    )
}