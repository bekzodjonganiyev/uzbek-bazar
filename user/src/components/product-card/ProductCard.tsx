import { ReactElement, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
// import { Rating } from "react-simple-star-rating"

import { Button } from "@/components/ui/button"

import placeholderImg from "@/assets/images/placeholder.png"

type Props = {
    img: string,
    productName: string,
    price: string,
    oldPrice?: string,
    rating?: boolean,
    ratingValue?: number
    newBadge?: boolean,
    discount?: string
}

export const ProductCard = (props: Props): ReactElement => {
    const [showAction, setShowAction] = useState<boolean>(false)

    const onHover = (e: unknown) => {
        console.log(e, "Enter")
        setShowAction(true)
    }

    const onLeave = (e: unknown) => {
        console.log(e, "Leave")
        setShowAction(false)
    }
    return (
        <div className='relative w-64' onMouseEnter={onHover} onMouseLeave={onLeave}>

            {/* |---POSITION ABSOLUTE ELEMENTS---| */}
            {
                props.newBadge
                    ? <span className='absolute font-medium px-3 py-1 bg-white rounded left-2 top-2'>NEW</span>
                    : null
            }

            {
                props.discount
                    ? <span className={`absolute font-medium px-3 py-1 bg-green-400 text-white rounded left-2 ${props.newBadge ? "top-12" : "top-2"}`}>{props.discount}</span>
                    : null
            }

            {/* |---IMAGE---| */}
            <div className='w-full h-96'>
                <LazyLoadImage
                    src={props.img}
                    alt={props.productName}
                    placeholderSrc={placeholderImg}
                    effect={'opacity'}
                    height="100%"
                    width="100%"
                    className='h-full w-full object-cover'
                />
            </div>


            {/* |---NAME, PRICE, RATING---| */}
            {/* TODO - `props.rating` bilan bog'liq contion larni optimize qilaman */}
            <div className={`${props.rating ? "text-left" : "text-center"} py-2 font-semibold`}>
                {
                    props.rating ? <div className='flex'>rating</div> : null
                }
                <h3 className={`${props.rating ? "text-left" : "text-center"}`}>{props.productName}</h3>
                <div className={`${props.rating ? "" : "justify-center"} flex gap-2`}>
                    <p>{props.price}</p>
                    {
                        props.oldPrice
                            ? <del className='text-stone-300 font-thin'>{props.oldPrice}</del>
                            : null
                    }
                </div>
            </div>

            {/* |---HOVERABLE ELEMENTS---| */}
            {
                showAction 
                ? <div className='absolute w-full h-full top-0'>
                    <div className='relative w-full h-full z-50'>
                        
                        <Button 
                            size={'sm'} 
                            variant={'secondary'} 
                            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-none hover:bg-white w-[90%]"
                        >Savatchaga</Button>
                    </div>
                </div>
                : null
            }
        </div>
    )
}