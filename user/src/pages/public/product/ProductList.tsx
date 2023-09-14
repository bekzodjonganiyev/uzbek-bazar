import { ReactElement, useState } from 'react'
import {  useParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import "react-range-slider-input/dist/style.css";
import "./product-view.css"

import { Button } from '@/components/ui/button'
import { CancelIcon, ColumnsIcon, FilterIcon } from '@/assets/icons'
import { CustomSelect, CustomSuspanse } from '@/components/common'
import { FiltersSkeleton, ProductCard, ProductSkeleton } from '@/components'

import { useFetch } from '@/utils/api'
import { currencys } from "@/utils/mocks"


import MultiRangeSlider from '@/components/multi-range-slider/MultiRangeSlider'

const a = [1, 2, 3, 4, 5, 6]
// type Props = {}

export const ProductList = (/*props: Props*/): ReactElement => {
    const { category } = useParams()

    const [minPrice, setMinPrice] = useState<number>()
    const [maxPrice, setMaxPrice] = useState<number>()

    // TODO - productlar filter qilinganda route ga yozishin kerak, professional ishlash konikmasi bu
    const productsByCaregory = useFetch<AxiosResponse, AxiosError>(
        ["product-list-by-cetegory", category, maxPrice, minPrice],
        `products/?category_slug=${category}&min_price=${minPrice ?? ""}&max_price=${maxPrice ?? ""}`,
    )
    const categoryDetails = useFetch<AxiosResponse, AxiosError>(["categories-by-slug", category], `categories/${category}`,)

    // const categoryDetails2 = useFetch<AxiosResponse, AxiosError>(
    //     ["category-parents", categoryDetails.data?.data.parent],
    //     `categories/${categoryDetails.data?.data.parent}`,
    //     categoryDetails.isFetched ? true : false
    // )

    return (
        <div className='py-5'>
            <h1 className='text-2xl font-medium text-center mb-5'>{category}</h1>

            <div className='flex items-start gap-10 relative'>

                {/* begin:FILTER */}
                <div className={`w-1/6 lg:flex hidden flex-col gap-5`}>
                    {/* -----FILTER HEADER----- */}
                    <h2 className='text-2xl font-medium'>Filter</h2>

                    <CustomSuspanse
                        loading={categoryDetails.isLoading && !categoryDetails.isPaused}
                        loadingFallback={
                            <div className='flex flex-wrap justify-between gap-10 py-10'>
                                <FiltersSkeleton limit={12} />
                            </div>
                        }
                        error={categoryDetails.isError || categoryDetails.isPaused}
                        errorFallback={"Error"}
                    >
                        {/* By Kategory  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>Kategoriyalar</h3>
                            <div className='flex flex-col gap-1'>
                                {
                                    categoryDetails.data?.data?.subcategories.map((i: any) => (
                                        <p key={i} className=''>{i.name}</p>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Color  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>Rang</h3>
                            <div className='flex flex-wrap gap-1'>
                                {
                                    a.map((i: any) => (
                                        <button style={{ background: `rgb(2${i}8, ${i}14, ${i}6)` }} key={i} className='p-5 border-2 rounded-full'></button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Size  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>O'lcham</h3>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    a.map((i: any) => (
                                        <button key={i} className='p-3 border'>{i}X</button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Coast */}
                        <div className='mb-10'>
                            <h3 className='uppercase font-medium mb-2'>Narx</h3>

                            {
                                // TODO - MultiRangeSlider render bolganda ProductList ham render bolyapti buni optimze qilish kerak
                                categoryDetails.data?.data.price
                                    ? <MultiRangeSlider
                                        min={categoryDetails.data?.data.price.min - 1}
                                        max={categoryDetails.data?.data.price.max + 1}

                                        // setRangeValue={() => {}}
                                        setRangeValue={(min: number, max: number) => {
                                            setMinPrice(min)
                                            setMaxPrice(max)
                                            // setSearchParams(params => {
                                            //     params.set("min_price", `${min}`)
                                            //     params.set("max_price", `${max}`)
                                            //     return params
                                            // })
                                        }}
                                    />
                                    : null
                            }
                        </div>

                        {/* By Style */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>Turkum</h3>
                            <div className='flex flex-col gap-1'>
                                {
                                    a.map((i: any) => (
                                        <p key={i} className=''>Kategory - {i}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </CustomSuspanse>
                </div>
                {/* end:FILTER */}

                {/* begin:FILTERED PRODUCTS */}
                <div className={`lg:w-5/6 w-full`}>
                    {/* ----FILTERED PRODUCTS HEADER----- */}
                    <div className='mb-3 flex flex-col gap-5'>
                        <div className='flex items-center justify-between  max-md:border-b'>
                            {/* Products count */}
                            <p>{productsByCaregory.data?.data.results.length}ta mahsulot topildi</p>

                            {/* Filter, sort and ui-change buttons */}
                            <div className='flex items-center gap-3'>
                                <CustomSelect
                                    items={currencys}
                                    changeHandler={(e) => console.log(e)}
                                    placeholderValue="Sort by"
                                />
                                <div className='flex items-center max-md:hidden'>
                                    <Button variant={'outline'} className={`rounded-none p-3`}><ColumnsIcon active count={5} /></Button>
                                    <Button variant={'outline'} className={`rounded-none p-3`}><ColumnsIcon active count={4} /></Button>
                                    <Button variant={'outline'} className={`rounded-none p-3`}><ColumnsIcon active count={3} /></Button>
                                    <Button variant={'outline'} className={`rounded-none p-3`}><ColumnsIcon active count={2} classNames='rotate-90' /></Button>
                                </div>
                            </div>
                        </div>

                        {/* Visible on mobile */}
                        <div className='flex justify-between md:hidden'>
                            <Button
                                variant={'outline'}
                                className='border-none p-0'
                            >
                                <span className='flex gap-2'><p>Filter</p> <FilterIcon /></span>
                            </Button>
                            <div className='flex items-center'>
                                <Button variant={'outline'} className={`rounded-none p-2`}><ColumnsIcon active count={2} /></Button>
                                <Button variant={'outline'} className={`rounded-none p-2`}><ColumnsIcon active count={2} classNames='rotate-90' /></Button>
                            </div>
                        </div>


                        {/* Cancel buttons */}
                        <div className='flex items-center gap-3'>
                            <Button
                                variant={'outline'}
                                size={'xsm'}
                                className='bg-stone-100'
                            >
                                <span className='flex items-center gap-2'><CancelIcon height={13} width={13} /><p className='md:text-sm text-xs'>Plants</p></span>
                            </Button>
                            <Button
                                variant={'outline'}
                                size={'xsm'}
                                className='bg-stone-100'
                            >
                                <span className='flex items-center gap-2'><CancelIcon height={13} width={13} /><p className='md:text-sm text-xs'>Plants</p></span>
                            </Button>
                            <Button
                                variant={'outline'}
                                size={'xsm'}
                                className='bg-stone-100'
                            >
                                <span className='flex items-center gap-2'><CancelIcon height={13} width={13} /><p className='md:text-sm text-xs'>Plants</p></span>
                            </Button>
                        </div>
                    </div>

                    {/* ----PRDUCTS---- */}
                    <CustomSuspanse
                        loading={productsByCaregory.isLoading && !productsByCaregory.isPaused}
                        loadingFallback={
                            <div className='flex flex-wrap justify-between gap-10 py-10'>
                                <ProductSkeleton limit={12} />
                            </div>
                        }
                        error={productsByCaregory.isError || productsByCaregory.isPaused}
                        errorFallback={"Error"}
                    >
                        <div className={`flex flex-wrap gap-5 justify-between`}>
                            {
                                productsByCaregory.data?.data.results.map((item: any) => (
                                    <ProductCard
                                        key={Number(item.id)}
                                        id={+item.id}
                                        img={item.photo}
                                        price={item.price}
                                        oldPrice={item.oldPice}
                                        discount={item.discount}
                                        productName={item.name}
                                        newBadge={item.newBadge}
                                        rating={item.rating}
                                    />
                                ))
                            }
                        </div>
                    </CustomSuspanse>
                </div>
                {/* end:FILTERED PRODUCTS */}
            </div>
        </div>
    )
}