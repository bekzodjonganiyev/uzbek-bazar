import { ReactElement, /*useState, useEffect*/ } from 'react'
import { AxiosError, AxiosResponse } from "axios";
import { Link } from 'react-router-dom'

import { NextItemIcon } from '@/assets/icons'

import { useFetch } from "@/utils/api";


// type Props = {
//     home?: boolean,
// }

// type Logos = {
//     logo: string,
//     name: string,
//     link: string
// }[] | null

export const LikedBrands = (/*props: Props*/): ReactElement => {
    const logos = useFetch<AxiosResponse, AxiosError>(["brands"], "brands/", false)

    return (
        <div className='p-10 flex md:flex-row flex-col items-start bg-card-bg max-md:gap-y-10'>
            <div className='md:w-1/2 w-full'>
                <h2 className='font-medium text-3xl text-textColor-black pb-3'>Sevimli brendlar</h2>
                <p className='text-textColor-primary pb-3'>At vero et accusamus et iusto odio dignissimos ducimus qui <br /> blanditiis deleniti atqu.</p>
                <Link to={"#"} className=" border-b border-black font-medium pb-1 inline-block">
                    <div className='flex items-end gap-2'><span>Barchasini ko'rish</span><NextItemIcon height={20} width={20} /></div>
                </Link>
            </div>
            <div className='md:w-1/2 w-full grid lg:grid-cols-3 grid-cols-2 gap-5 min-w-44'>
                {
                    logos.data?.data.results?.slice(0,6).map((item: any) => (
                        <a href={item.link} target="_blank" key={item.id}>
                            <img src={item.icon} alt={item.name} />
                        </a>
                    ))
                }
            </div>
        </div>
    )
}