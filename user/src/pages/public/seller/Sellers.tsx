import { ReactElement, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FilterIcon, SearchIcon } from '@/assets/icons'
import { CustomSelect } from '@/components/common'

import sallerBgImage from "@/assets/images/sellers-bg.png"

import { currencys } from "@/utils/mocks"
import { SellerCard } from '@/components'

// type Props = {}

export const Sellers = (/*props: Props*/): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("")

    const sellers = [1,2,3,4,5,6,7,8,9]
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
            <div className='flex flex-wrap justify-between gap-y-7'>
                {
                    sellers.map((i: any) => (
                        <SellerCard 
                            key={i}
                            id={i}
                            img='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                            name='Ict shop Ict shop Ict shop Ict shop Ict shop Ict shop Ict shop '
                            rating={3}
                        />
                    ))
                }
            </div>            
        </div>
    )
}