import { ReactElement } from 'react'
// import { useParams } from 'react-router-dom'
import { ProductList } from '..'
import { Rating } from 'react-simple-star-rating'
import { FacebookIcon, GlobeIcon, InstaIcon, MailIcon, PhoneIcon } from '@/assets/icons'

// type Props = {}

export const SellerDetails = (/*props: Props*/): ReactElement => {
    // const { id } = useParams()

    return (
        <div className='py-10'>
            <div className='flex justify-between gap-20 mb-10'>
                {/* -----INFO SECTION----- */}
                <div className='flex flex-col w-1/2'>
                    {/* Rating and date */}
                    <div className='flex items-center gap-5'>
                        <Rating
                            initialValue={2}
                            onClick={function noRefCheck() { }}
                            readonly
                            className='star-svg -mt-2'
                            size={20}
                        />
                        <p>{new Date().getUTCFullYear()} dan beri UZBEKBAZAR sotuvchisi</p>
                    </div>

                    {/* Title */}
                    <h1 className='text-3xl font-medium mt-2 mb-5'>Terra Pro</h1>

                    {/* Short description */}
                    <p className='text-stone-500 mb-5'>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
                    </p>

                    {/* Tel */}
                    <div className="flex gap-2 mb-5"><PhoneIcon /><p className='font-medium'>+998 (90) 123-45-67</p></div>

                    {/* Social networks */}
                    <div className='flex gap-5'>
                        <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><FacebookIcon /></span>
                        <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><InstaIcon /></span>
                        <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><MailIcon /></span>
                        <span className='flex items-center justify-center p-2 rounded-full bg-stone-100'><GlobeIcon /></span>
                    </div>
                </div>

                {/* -----SELLER LOGO-----*/}
                <div className='w-1/2 border h-96'>
                    <img 
                        src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                        className='w-full h-full object-cover'
                        alt="" 
                    />
                </div>
            </div>

            <ProductList />
        </div>
    )
}