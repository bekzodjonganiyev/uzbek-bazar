import { ReactElement, ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AxiosError, AxiosResponse } from 'axios'

import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useFetch } from '@/utils/api'
import MultiRangeSlider from '../multi-range-slider/MultiRangeSlider'
import { CustomSuspanse } from '../common'
import { FiltersSkeleton } from '../loaders'

interface Props {
    children: ReactNode
    category: string | undefined
    filters: { key: string, value: string }[]
    setFilters: Function
}

export const FiltersSheet = (props: Props): ReactElement => {
    const [_, setSearchParams] = useSearchParams()

    const categoryDetails = useFetch<AxiosResponse, AxiosError>(["categories-by-slug", props.category], `categories/${props.category}`, false)

    const filterValuesController = (key: string, value: string) => {
        let temp: { key: string, value: string }[] = []
        let added = false
        props.filters.forEach(item => {
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
        props.setFilters(Array.from(temp))
        temp = []
    }
    return (
        <aside className='z-[9999] h-full'>
            <ScrollArea className='h-full'>

                <SheetHeader>
                    <SheetTitle className='text-2xl font-semibold mb-5'>Filters</SheetTitle>
                    {/* {props.children} */}
                    <div className={`flex flex-col gap-y-3`}>
                        {/* -----FILTER HEADER----- */}
                        {/* <h2 className='text-2xl font-medium'>Filter</h2> */}

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
                            <div className='mb-10'>
                                <h3 className='uppercase text-center font-medium mb-2'>Kategoriyalar</h3>
                                <div className='flex flex-col items-center justify-center gap-1 '>
                                    {
                                        categoryDetails.data?.data?.subcategories.length === 0
                                            ? "No categories found"
                                            : categoryDetails.data?.data?.subcategories.map((i: any) => (
                                                <Link to={`/catalog/${i.slug}`} key={i} className=''>{i.name}</Link>
                                            ))
                                    }</div>
                            </div>

                            {/* By Color  */}
                            <div className='mb-10'>
                                <h3 className='uppercase text-center font-medium mb-2'>Rang</h3>
                                <div className='flex items-center justify-center flex-wrap gap-1'>
                                    {
                                        categoryDetails.data?.data?.colors.map((i: any) => (
                                            <button
                                                key={i.id}
                                                style={{ background: i.code }}
                                                className='p-3 border-2 rounded-full'
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
                            <div className='mb-10'>
                                <h3 className='uppercase text-center font-medium mb-2'>O'lcham</h3>
                                <div className='flex flex-wrap items-center justify-center gap-2 '>
                                    {
                                        categoryDetails.data?.data?.sizes.map((i: any) => (
                                            <button
                                                key={i.id}
                                                className='p-2 border'
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
                                <h3 className='uppercase text-center font-medium mb-2'>Narx</h3>
                                <div className='relative flex items-center justify-center'>
                                    {
                                        // TODO - MultiRangeSlider render bolganda ProductList ham render bolyapti buni optimze qilish kerak
                                        categoryDetails.data?.data.price
                                            ? <MultiRangeSlider
                                                className=''
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
                            </div>

                            {/* By Style */}
                            <div className='mb-10'>
                                <h3 className='uppercase text-center font-medium mb-2'>Turkum</h3>
                                <div className='flex flex-col items-center justify-center gap-1'>
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
                </SheetHeader>
            </ScrollArea>
        </aside>
    )
}