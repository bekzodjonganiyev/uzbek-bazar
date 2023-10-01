import { ReactElement, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductSkeleton, SellerCard } from '@/components'
import { CustomSelect, CustomSuspanse } from '@/components/common'
import { FilterIcon, SearchIcon } from '@/assets/icons'

import sallerBgImage from "@/assets/images/sellers-bg.png"

import { currencys } from "@/utils/mocks"
import { useFetch } from '@/utils/api'
import { AxiosError, AxiosResponse } from 'axios'

// type Props = {}

export const Sellers = (/*props: Props*/): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("")
    const sellers = useFetch<AxiosResponse, AxiosError>(["sellers"], `organizations/`)
    return (
        <div className='py-10'>
            <div
                style={{ backgroundImage: `url("${sallerBgImage}")` }}
                className='w-full h-96 bg-cover bg-no-repeat flex items-center justify-center'
            >
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-medium text-center'>Sotuvchilar</h1>
                    <p className='text-center'>At vero eos et accusamus et iusto odio dignissimos qui blanditiis <br /> praesentium voluptatum deleniti.</p>
                    <div className="relative max-md:w-full">
                        {/* TODO - icon bosilganda search qilishi kerak */}
                        <SearchIcon className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
                        <Input className='md:w-[500px]' placeholder='Izlash...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* -----SELLERS LIST HEADER----- */}
            <div className='mt-10 mb-5'>
                <div className='flex items-center justify-between max-md:border-b'>
                    {/* Products count */}
                    <p>{ }_ mahsulotlar</p>

                    {/* Filter, sort and ui-change buttons */}
                    <div className='flex items-center gap-3'>
                        <Button
                            variant={'outline'}
                            className='border-none max-md:hidden'
                        >
                            <span className='flex gap-2'><p>Filter</p> <FilterIcon /></span>
                        </Button>
                        <CustomSelect
                            items={currencys}
                            changeHandler={(e) => console.log(e)}
                            placeholderValue="Sort by"
                        />
                    </div>
                </div>
            </div>

            {/* -----SELLERS LIST----- */}
            <CustomSuspanse
                loading={sellers.isLoading}
                loadingFallback={
                    <div className='flex flex-wrap gap-7'>
                        <ProductSkeleton limit={12} />
                    </div>
                }
                error={sellers.isError}
                errorFallback={sellers.error?.message}
            >
                <div className='flex flex-wrap justify-between'>
                    {
                        sellers.data?.data.results.map((i: any) => (
                            <SellerCard
                                key={i.id}
                                id={i.id}
                                img={i.avatar}
                                name={i.name}
                                rating={3}
                            />
                        ))
                    }
                </div>
            </CustomSuspanse>

        </div>
    )
}