import { ReactElement, /*/useState,*/ useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"

import { Button } from '@/components/ui/button'
import { CancelIcon, ColumnsIcon, FilterIcon } from '@/assets/icons'
import { CustomSelect, CustomSuspanse } from '@/components/common'
import { ProductCard, ProductSkeleton } from '@/components'

import { useFetch } from '@/utils/api'
import { currencys } from "@/utils/mocks"


// type Props = {}

export const ProductList = (/*props: Props*/): ReactElement => {
    let [searchParams] = useSearchParams();
    // const [filter, setFilter] = useState<boolean>(true)

    const searchValue = searchParams.get("category")
    const productsByCaregory = useFetch<AxiosResponse, AxiosError>(["product-list-by-cetegory", searchValue], `products?category_slug=${searchValue}`)

    useEffect(() => {
        console.log(searchValue)
    }, [searchValue])

    return (
        <div className='py-5'>
            <h1 className='text-2xl font-medium text-center mb-5'>{searchValue}</h1>

            <div className='flex items-start gap-5 relative'>

                {/* begin:FILTER */}
                <div className={`w-1/6 clg-r p-3 lg:block hidden`}>
                    {/* -----FILTER HEADER----- */}
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-medium'>Filterlar</h2>
                    </div>
                </div>
                {/* end:FILTER */}

                {/* begin:FILTERED PRODUCTS */}
                <div className={`lg:w-5/6 w-full`}>
                    {/* ----FILTERED PRODUCTS HEADER----- */}
                    <div className='mb-3 flex flex-col gap-5'>
                        <div className='flex items-center justify-between  max-md:border-b'>
                            {/* Products count */}
                            <p>{ }_ mahsulotlar</p>

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
                        loading={productsByCaregory.isLoading}
                        loadingFallback={
                            <div className='flex flex-wrap justify-between gap-10 py-10'>
                                <ProductSkeleton limit={12} />
                            </div>
                        }
                        error={productsByCaregory.isError}
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