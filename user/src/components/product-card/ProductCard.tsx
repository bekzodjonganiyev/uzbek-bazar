import { ReactElement, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector } from "react-redux"

import { Button } from "@/components/ui/button"

import placeholderImg from "@/assets/images/placeholder.png"
import { EyeIcon, LikeIcon, OppositeIcon } from '@/assets/icons'

import { useAppDispatch, RootState } from "@/redux"
import { ProductCardActions } from "@/redux/actions"
import { Link } from 'react-router-dom'
const { setCartId, deleteCartId, setCompareId, deleteCompareId, setWishlistId, deleteWishlistId } = new ProductCardActions()

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
    const product = useSelector((state: RootState) => state.product)
    const [showAction, setShowAction] = useState<boolean>(false)

    const onHover = () => {
        setShowAction(true)
    }

    const onLeave = () => {
        setShowAction(false)
    }

    const onLike = () => {
        if (!product?.wishlist.includes(props.id)) {
            dispatch(setWishlistId(props.id))
        } else (
            dispatch(deleteWishlistId(props.id))
        )
    }

    const onComparison = () => {
        if (!product?.compare.includes(props.id)) {
            dispatch(setCompareId(props.id))
        } else (
            dispatch(deleteCompareId(props.id))
        )
    }

    const onCart = () => {
        if (!product?.cart.includes(props.id)) {
            dispatch(setCartId(props.id))
        } else (
            dispatch(deleteCartId(props.id))
        )
    }

    return (
        <Link to={""}>
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
                                    {/* TODO - `test.includes(props.id)` ning o'rniga optimalroq yechim kerak */}
                                    <Button variant={'outline'} size={'icon'} className={`rounded-none ${product?.wishlist.includes(props.id) ? "bg-black" : ""}`} onClick={() => onLike()}><LikeIcon color={`${product?.wishlist.includes(props.id) ? "white" : "#121212"}`} /></Button>
                                    <Button variant={'outline'} size={'icon'} className="rounded-none" onClick={() => alert("Id")}><EyeIcon /></Button>
                                    <Button variant={'outline'} size={'icon'} className={`rounded-none ${product?.compare.includes(props.id) ? "bg-black" : ""}`} onClick={() => onComparison()}><OppositeIcon color={`${product?.compare.includes(props.id) ? "white" : "#121212"}`} /></Button>
                                </div>
                                <Button
                                    size={'sm'}
                                    variant={'outline'}
                                    className={`absolute md:top-80 top-60 left-1/2 -translate-x-1/2 rounded-none w-[90%]`}
                                    onClick={() => onCart()}
                                >Savatchaga</Button>
                            </div>
                        </div>
                        : null
                }
            </div>
        </Link>
    )
}