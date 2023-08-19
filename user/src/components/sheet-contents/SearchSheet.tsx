import { ReactElement, useEffect, useState, useCallback } from 'react'
import { useDebounce } from 'use-debounce';

import { Input } from "@/components/ui/input"
import { LogoIcon, SearchIcon } from "@/assets/icons"

interface Props { }

export const SearchSheet = (props: Props): ReactElement => {
    const [search, setSearch] = useState<string>("")
    const [value] = useDebounce(search, 1000);

    const handleInput = (value:string) :void => {
        setSearch(value)
    }

    const searchFunc = (searchValue: string) => {
        // API call
    }

    useEffect(() => {
        searchFunc(value)
    }, [value])


    return (
        <nav>
            <LogoIcon />
            <div className='flex items-center justify-center mt-10'>
                <div className="relative">
                    <SearchIcon className=" w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
                    <Input className='md:w-[500px]' placeholder='Mahsulot izlash...' value={search} onChange={(e) => handleInput(e.target.value)} />
                </div>
            </div>
            <div className='flex items-center justify-center gap-5 mt-3 max-sm:text-xs max-md:text-sm'>
                <p className='text-gray-400 inline'>Tezkor qidiruv:</p>
                <div className='flex gap-3'>
                    <span className='cursor-pointer' onClick={() => setSearch("Futbolkalar")}>Futbolkalar</span>
                    <span className='cursor-pointer' onClick={() => setSearch("Ko’ylaklar")}>Ko’ylaklar</span>
                    <span className='cursor-pointer' onClick={() => setSearch("Shimlar")}>Shimlar</span>
                    <span className='cursor-pointer' onClick={() => setSearch("Yoz")}>Yoz</span>
                </div>
            </div>
        </nav>
    )
}