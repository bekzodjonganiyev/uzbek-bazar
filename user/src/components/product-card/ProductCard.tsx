import { ReactElement, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"

import placeholderImg from "@/assets/images/placeholder.png"
import { EyeIcon, LikeIcon, OppositeIcon } from '@/assets/icons'

import { useAppDispatch, RootState } from "@/redux"
import { setId, deleteId } from "@/redux/action/test"

type Props = {
    id: number,
    img: string,
    productName: string,
    price: string,
    oldPrice?: string | null,
    rating?: boolean,
    ratingValue?: number
    newBadge?: boolean,
    discount?: string | null
}

export const ProductCard = (props: Props): ReactElement => {
    const dispatch = useAppDispatch()
    const test = useSelector((state: RootState) => state.test)
    const [showAction, setShowAction] = useState<boolean>(false)

    const onHover = () => {
        setShowAction(true)
    }

    const onLeave = () => {
        setShowAction(false)
    }

    const onLike = () => {
        if (!test.includes(props.id)){
            dispatch(setId(props.id))
        } else (
            dispatch(deleteId(props.id))
        )
    }

    const onComparison = () => {
        console.log(props, "onComparison")
    }

    const onCart = () => {
        console.log(props, "onCart")
    }

    return (
        <div className='relative md:w-64 w-52 rounded-md' onMouseEnter={() => onHover()} onMouseLeave={() => onLeave()}>

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
            <div className='w-full md:h-96 h-72'>
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
            {/* TODO - `props.rating` bilan bog'liq condition larni optimize qilaman */}
            <div className={`${props.rating ? "text-left" : "text-center"} py-2 font-semibold`}>
                {
                    props.rating ? <div className='flex'>rating</div> : null
                }
                <h3 className={`${props.rating ? "text-left" : "text-center"} line-clamp-1`}>{props.productName}</h3>
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
                ? <div className='absolute w-full h-full top-0 left-0'>
                    <div className='relative w-full h-full z-50'>
                        <div className='flex flex-col absolute right-3 top-20'>
                            <Button variant={'outline'} size={'icon'} className={`rounded-none ${test.includes(props.id) ? "bg-black" : ""}`} onClick={() => onLike()}><LikeIcon color={`${test.includes(props.id) ? "white" : "#121212"}`} /></Button>
                            <Button variant={'outline'} size={'icon'} className="rounded-none" onClick={() => alert("Id")}><EyeIcon /></Button>
                            <Button variant={'outline'} size={'icon'} className="rounded-none" onClick={() => onComparison()}><OppositeIcon /></Button>
                        </div>
                        <Button 
                            size={'sm'} 
                            variant={'outline'} 
                            className={`absolute ${props.rating ? "bottom-24" : "bottom-[75px]"} left-1/2 -translate-x-1/2 rounded-none w-[90%]`}
                            onClick={() => onCart()}
                        >Savatchaga</Button>
                    </div>
                </div>
                : null
            }
        </div>
    )
}