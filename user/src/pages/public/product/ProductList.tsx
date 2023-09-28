import { ReactElement, useState } from 'react'
import { Link, useParams, useSearchParams, useLocation } from "react-router-dom"
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

// type Props = {}

export const ProductList = (/*props: Props*/): ReactElement => {
    const { search } = useLocation()
    const { category } = useParams()
    const [_, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState<{ key: string, value: string }[]>([])

    const categoryDetails = useFetch<AxiosResponse, AxiosError>(["categories-by-slug", category], `categories/${category}`,)
    const productsByCaregory = useFetch<AxiosResponse, AxiosError>(
        ["product-list-by-cetegory", category, search],
        `products/?category_slug=${category}&${search.split("?").join("")}`
    )

    const filterValuesController = (key: string, value: string) => {
        let temp: { key: string, value: string }[] = []
        let added = false
        filters.forEach(item => {
            if (item.key !== key) {
                temp.push({ key: item.key, value: `${item.value}` });
            } else {
                temp.push({ key: item.key, value: `${value}` });
                added = true
            }
        })
        if (!added) {
            temp.push({ key: key, value: `${value}` });
        }
        setFilters(Array.from(temp))
        temp = []
    }

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
                                        <Link to={`/catalog/${i.slug}`} key={i} className=''>{i.name}</Link>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Color  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>Rang</h3>
                            <div className='flex flex-wrap gap-1'>
                                {
                                    categoryDetails.data?.data?.colors.map((i: any) => (
                                        // <button style={{ background: `rgb(2${i}8, ${i}14, ${i}6)` }} key={i} className='p-5 border-2 rounded-full'></button>
                                        <button
                                            key={i.id}
                                            style={{ background: i.code }}
                                            className='p-5 border-2 rounded-full'
                                            onClick={() => {
                                                setSearchParams(prev => {
                                                    prev.set("color", `${i.code}`)
                                                    return prev
                                                })
                                                filterValuesController("color", i.code)
                                            }}
                                        >
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Size  */}
                        <div>
                            <h3 className='uppercase font-medium mb-2'>O'lcham</h3>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    categoryDetails.data?.data?.sizes.map((i: any) => (
                                        <button
                                            key={i.id}
                                            className='p-3 border'
                                            onClick={() => {
                                                setSearchParams(prev => {
                                                    prev.set("size", `${i.name}`)
                                                    return prev
                                                })
                                                filterValuesController("size", i.name)
                                            }}
                                        >
                                            {i.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* By Price */}
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
                                            setSearchParams(params => {
                                                params.set("min_price", `${min}`)
                                                params.set("max_price", `${max}`)
                                                return params
                                            })
                                            filterValuesController("price", `${min} - ${max}`)
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
                                    categoryDetails.data?.data?.types.map((i: any) => (
                                        <button
                                            key={i}
                                            className='capitalize inline-block w-fit'
                                            onClick={() => {
                                                setSearchParams(prev => {
                                                    prev.set("type", `${i}`)
                                                    return prev
                                                })
                                                filterValuesController("type", i)
                                            }}
                                        >
                                            {i}
                                        </button>
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


                        {/* Reset filters */}
                        <div className='flex items-center gap-3'>
                            {
                                filters.map(item => (
                                    <Button
                                        key={item.key}
                                        variant={'outline'}
                                        size={'xsm'}
                                        className='bg-stone-100'
                                        onClick={() => {
                                            const filteredArr = filters.filter(subItem => subItem.key !== item.key)
                                            setFilters(filteredArr)
                                            if (item.key === "price") {
                                                setSearchParams(prev => {
                                                    prev.delete("max_price")
                                                    prev.delete("min_price")
                                                    return prev
                                                })
                                            } else {
                                                setSearchParams(prev => {
                                                    prev.delete(item.key)
                                                    return prev
                                                })
                                            }
                                        }}
                                    >
                                        <span className='flex items-center gap-2'>
                                            <CancelIcon height={13} width={13} />
                                            <p className='md:text-sm text-xs'>{item.value}</p>
                                        </span>
                                    </Button>
                                ))
                            }
                            {
                                filters.length > 0
                                    ? <Button
                                        variant={'outline'}
                                        size={'xsm'}
                                        className='bg-stone-100'
                                        onClick={() => {
                                            setFilters([])
                                            setSearchParams(prev => {
                                                prev.delete("max_price")
                                                prev.delete("min_price")
                                                prev.delete("color")
                                                prev.delete("type")
                                                prev.delete("size")
                                                return prev
                                            })
                                        }}
                                    >
                                        <span className='flex items-center gap-2'>
                                            <CancelIcon height={13} width={13} />
                                            <p className='md:text-sm text-xs'>Clear All</p>
                                        </span>
                                    </Button>
                                    : ""
                            }
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