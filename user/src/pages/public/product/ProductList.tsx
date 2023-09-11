import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css";

import { Button } from '@/components/ui/button'
import { CancelIcon, ColumnsIcon, FilterIcon } from '@/assets/icons'
import { CustomSelect, CustomSuspanse } from '@/components/common'
import { FiltersSkeleton, ProductCard, ProductSkeleton } from '@/components'

import { useFetch } from '@/utils/api'
import { currencys } from "@/utils/mocks"


// import MultiRangeSlider from '@/components/multi-range-slider/MultiRangeSlider'


// type Props = {}
const a = [1, 2, 3, 4, 5, 6]

export const ProductList = (/*props: Props*/): ReactElement => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const location = useLocation()

    const [cost, setCost] = useState<{ minVal: number, maxVal: number }>({minVal: 25, maxVal:100})
    const [b, setA] = useState<any>()
    // const [filter, setFilter] = useState<{hasFilter: boolean, filters: Object, values: string}>({ hasFilter: false, filters: {}, values: "" })

    const searchValue = searchParams.get("category")
    const productsByCaregory = useFetch<AxiosResponse, AxiosError>(
        ["product-list-by-cetegory", location.search],
        `products${location.search}`)

    // ----Get min and max price---- // 
    // const priseArr = productsByCaregory.isFetched ? productsByCaregory.data?.data.results.map((item: any) => item.price) : []
    // let minValue: number = priseArr[0];
    // let maxValue: number = priseArr[0];

    // for (let i = 1; i < priseArr.length; i++) {
    //     if (priseArr[i] < minValue) {
    //         minValue = priseArr[i];
    //     }
    //     if (priseArr[i] > maxValue) {
    //         maxValue = priseArr[i];
    //     }
    // }
    // ----Get min and max price---- //

    console.log("render")
    console.log(location)
    // for (let p of searchParams.entries()) {
    //     setA(`?${p[0]=p[1]}`)
    //     console.log(p);
    //   }
    return (
        <div className='py-5'>
            <h1 className='text-2xl font-medium text-center mb-5'>{searchValue}</h1>

            <div className='flex items-start gap-10 relative'>

                {/* begin:FILTER */}
                <div className={`w-1/6 lg:flex hidden flex-col gap-5`}>
                    {/* -----FILTER HEADER----- */}
                    <h2 className='text-2xl font-medium'>Filter</h2>

                    <CustomSuspanse
                        loading={productsByCaregory.isLoading && !productsByCaregory.isPaused}
                        loadingFallback={
                            <div className='flex flex-wrap justify-between gap-10 py-10'>
                                <FiltersSkeleton limit={12} />
                            </div>
                        }
                        error={productsByCaregory.isError || productsByCaregory.isPaused}
                        errorFallback={"Error"}
                    >
                        {/* By Kategory  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>Kategoriyalar</h3>
                            <div className='flex flex-col gap-1'>
                                {
                                    a.map((i: any) => (
                                        <p key={i} className=''>Kategory - {i}</p>
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
                            {/* <MultiRangeSlider
                                min={cost?.minVal}
                                max={cost?.maxVal}
                                // TODO - MultiRangeSlider render bolganda ProductList ham render bolyapti buni optimze qilish kerak
                                // setRangeValue={setCost}
                                setRangeValue={(min: number, max: number) => {
                                    setCost({minVal: min, maxVal: max})
                                    setSearchParams(params => {
                                        params.set("min_price", `${min}`)
                                        params.set("max_price", `${max}`)
                                        return params
                                    })



                                }}
                            /> */}
                            <RangeSlider  />
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