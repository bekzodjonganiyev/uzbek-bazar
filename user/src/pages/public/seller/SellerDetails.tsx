import { ReactElement } from 'react'
import { Rating } from 'react-simple-star-rating'
import { useParams } from 'react-router-dom'
import { AxiosError, AxiosResponse } from 'axios'

import { SellersSkeleton } from '@/components'
import { FacebookIcon, GlobeIcon, InstaIcon, MailIcon, PhoneIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'

import { useFetch } from '@/utils/api'

// type Props = {}

export const SellerDetails = (/*props: Props*/): ReactElement => {
    const { id } = useParams()

    // const [filters, setFilters] = useState<{ key: string, value: string }[]>([])

    const sellerDetails = useFetch<AxiosResponse, AxiosError>(["seller-details", id], `organizations/${id}/`, false)


    // const filterValuesController = (key: string, value: string) => {
    //     let temp: { key: string, value: string }[] = []
    //     let added = false
    //     filters.forEach(item => {
    //         if (item.key !== key) {
    //             temp.push({ key: item.key, value: `${item.value}` });
    //         } else {
    //             temp.push({ key: item.key, value: `${value}` });
    //             added = true
    //         }
    //     })
    //     if (!added) {
    //         temp.push({ key: key, value: `${value}` });
    //     }
    //     setFilters(Array.from(temp))
    //     temp = []
    // }

    return (
        <div className='py-10'>
            <CustomSuspanse
                loading={sellerDetails.isLoading}
                loadingFallback={<SellersSkeleton />}
                error={sellerDetails.isError}
                errorFallback={sellerDetails.error?.message}
            >
                <div className='flex max-md:flex-col-reverse justify-between gap-20 mb-10'>
                    {/* -----INFO SECTION----- */}
                    <div className='flex flex-col md:w-1/2'>
                        {/* Rating and date */}
                        <div className='flex items-center gap-5'>
                            <Rating
                                initialValue={2}
                                onClick={function noRefCheck() { }}
                                readonly
                                // className='-mt-2'
                                size={20}
                            />
                            <p>{new Date().getUTCFullYear()} dan beri UZBEKBAZAR sotuvchisi</p>
                        </div>

                        {/* Title */}
                        <h1 className='text-3xl font-medium mt-2 mb-5'>{sellerDetails.data?.data.name}</h1>

                        {/* Short description */}
                        <p className='text-stone-500 mb-5'>
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
                        </p>

                        {/* Tel */}
                        <div className="flex gap-2 mb-5"><PhoneIcon /><p className='font-medium'>{sellerDetails.data?.data.phone}</p></div>

                        {/* Social networks */}
                        <div className='flex gap-5'>
                            <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><FacebookIcon /></span>
                            <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><InstaIcon /></span>
                            <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><MailIcon /></span>
                            <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><GlobeIcon /></span>
                        </div>
                    </div>

                    {/* -----SELLER LOGO-----*/}
                    <div className='mad:w-1/2 border h-96'>
                        <img
                            src={sellerDetails.data?.data.avatar}
                            className='w-full h-full object-cover'
                            alt=""
                        />
                    </div>
                </div>
            </CustomSuspanse>


        </div>
    )
}