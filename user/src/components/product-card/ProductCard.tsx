import { ReactElement } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import placeholderImg from "@/assets/images/placeholder.png"
import { EyeIcon, LikeIcon } from '@/assets/icons'
import { ProductCartModal } from '@/components'

import { useAppDispatch, RootState } from "@/redux"
import { setWishlistId, deleteWishlistId } from "@/redux/actions/wishlist-action"
// import { http } from '@/utils/api'
import { cn } from '@/lib/utils'
import { productListType } from "@/interfaces/product"

export const ProductCard = (props: productListType): ReactElement => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const dispatch = useAppDispatch()
    // const queryClient = useQueryClient()

    const cart = useSelector((state: RootState) => state.cart)
    const productIdsForCart = cart?.ids.map((i) => i.id)

    const wishlist = useSelector((state: RootState) => state.wishlist)
    const isWishlist = wishlist?.find(item => item.id === props.id)

    // const createMutation = useMutation({
    //     mutationFn: (variables: { url: string, data: any }) => http().post(variables.url, variables.data),
    //     onSuccess: (data) => {
    //         queryClient.invalidateQueries({ queryKey: ["user-carts"] })
    //         const url = data.config.url?.split("/")[0]
    //         toast({
    //             description: url === "carts" ? "Maxsulot savatga qo'shildi" : "Maxsulot sevimlilarga qo'shildi",
    //             variant: "success",
    //             action: <ToastAction
    //                 className="bg-white text-black text-xs font-bold"
    //                 altText="Try again"
    //                 onClick={() => navigate(`${url === "carts" ? "/cart" : "/favourites"}`)}
    //             >
    //                 {url === "carts" ? "Savatga o'tish" : "Sevimlilarga o'tish"}
    //             </ToastAction>,
    //         })
    //     },
    //     onError: (err) => console.log(err)
    // })

    // const deleteMutation = useMutation({
    //     mutationFn: (variables: { url: string, data: any }) => http().delete(variables.url, variables.data),
    //     onSuccess: (data) => {
    //         queryClient.invalidateQueries({ queryKey: ["user-carts"] })
    //         const url = data.config.url?.split("/")[0]
    //         toast({
    //             description: url === "carts" ? "Maxsulot savatdan o'chirildi" : "Maxsulot sevimlilardan o'chirildi",
    //             variant: "danger",
    //         })
    //     },
    //     onError: (err) => console.log(err)
    // })

    const onLike = () => {
        if (!isWishlist) {
            dispatch(setWishlistId(props))
            toast({
                description: "Maxsulot sevimlilarga qo'shildi",
                variant: "success",
                action: <ToastAction
                    className="bg-white text-black text-xs font-bold"
                    altText="Try again"
                    onClick={() => navigate("/favourites")}
                >
                    Sevimlilarga o'tish
                </ToastAction>,
            })

        } else {
            dispatch(deleteWishlistId(props))
        }
    }

    // const onCart = () => {
    //     if (!productIdsForCart.includes(props.id)) {
    //         createMutation.mutateAsync({
    //             url: "carts/",
    //             data: {
    //                 session_id: machineId, // TODO - login qilinganda null ketadi
    //                 quantity: 1,
    //                 product: props.id,
    //                 user: null // TODO - login qilinganda user_id ketadi
    //             }
    //         })
    //             .then(({ data }) => {
    //                 dispatch(setCartId(props.id, data.id, ""))
    //             })

    //     } else {
    //         const temp: any = cart.ids.find(item => item.id === props.id) // { id: <id>, cartId: <cartId> }

    //         deleteMutation.mutateAsync({
    //             url: `carts/${temp.cartId}`,
    //             data: {}
    //         })
    //             .then(() => {
    //                 dispatch(deleteCartId(props.id, temp.cartId, ""))
    //             })
    //     }
    // }

    if (props.row) {
        return (
            // Not Hoverable ProcutCard
            <div className={cn('sm:p-3 p-0 flex items-start min-[365px]:justify-between sm:gap-1 gap-0 border')}>
                <div className='md:w-4/12 sm:w-3/12 w-3/12 sm:h-36 h-32 max-sm:mr-3'>
                    <Link to={`/product/details/${props.id}`}>
                        <LazyLoadImage
                            src={props.photo ?? placeholderImg}
                            alt={props.name}
                            // placeholderSrc={placeholderImg}
                            // effect={'blur'}
                            height="100%"
                            width="100%"
                            className='h-full w-full object-cover object-top'
                        />
                    </Link>
                </div>

                {/* NAME, RATE, ADDITIONAL INFO */}
                <div className='md:w-4/12 sm:w-6/12 w-4/12 max-[365px]:mr-9'>
                    <Link to={`/product/details/${props.id}`} className='hover:text-red-700'>
                        <h3 className={cn("leading-none line-clamp-2 sm:text-base text-[14px]")}>{props.name}</h3>
                    </Link>
                    {
                        props.rating
                            ? <Rating initialValue={props.rating} size={17} readonly />
                            : null
                    }
                    <div className='flex flex-col'>
                        <div className='h-[12px]'><b className='text-xs'>Material:</b><span className='ml-1 text-xs'>{props.material}</span></div>
                        <div className='h-[12px] my-[7px]'><b className='text-xs'>Minimum sold:</b><span className='ml-1 text-xs'>{props.minimum_order_count}</span></div>
                        <div className='h-[12px]'><b className='text-xs'>Season:</b><span className='ml-1 text-xs'>{props.season}</span></div>
                    </div>
                </div>

                {/* PRICE, BUTTONS */}
                <div className='w-3/12 h-full flex justify-end'>
                    <div className='flex flex-col justify-between items-end gap-5'>
                        <p className='md:text-sm text-xs'>{props.price}$</p>
                        <div className='flex'>
                            <button className={`rounded-none border-none`} onClick={() => onLike()}><LikeIcon color={`${isWishlist ? "#121212" : "white"}`} /></button>
                            <button className={"rounded-none border-none"}> <Link to={`/product/details/${props.id}`} className='w-full h-full flex items-center justify-center'><EyeIcon /></Link></button>
                            {/* <button className={`rounded-none border-none`} onClick={() => onCart()}>
                                <CartIcon
                                    width={25}
                                    height={25}
                                    color={`${productIdsForCart.includes(props.id) ? "white" : "#121212"}`}
                                    type={`${productIdsForCart.includes(props.id) ? "in" : "add"}`}
                                />
                            </button> */}
                            <ProductCartModal img={props.photo} isCartItem={productIdsForCart.includes(props.id)} id={props.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        // Hoverable ProductCard
        <div className={cn('group relative rounded-md mb-3 ')}>

            {/* |---POSITION ABSOLUTE ELEMENTS---| */}
            {/* {
                props.newBadge
                    ? <span className='absolute font-medium px-3 py-1 bg-white rounded left-2 top-2 md:text-sm text-xs'>NEW</span>
                    : null
            } */}

            {
                props.discount
                    ? <span className={`absolute font-medium px-3 py-1 bg-green-400 text-white rounded left-2 md:text-sm text-xs top-2`}>{props.discount}</span>
                    : null
            }

            {/* |---IMAGE---| */}
            <div className='w-full md:h-80 sm:h-64 h-56 relative'>
                <Link to={`/product/details/${props.id}`}>
                    <LazyLoadImage
                        src={props.photo ?? placeholderImg}
                        alt={props.name}
                        // placeholderSrc={placeholderImg}
                        // effect={'blur'}
                        height="100%"
                        width="100%"
                        className='h-full w-full object-cover object-top'
                    />
                </Link>

                {/* Visible on mobile like btn*/}
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className={`rounded-none bg-transparent border-none max-md:block hidden absolute right-0 top-0 z-10`}
                    onClick={() => onLike()}
                >
                    <span className='flex items-center justify-center'>
                        <LikeIcon color={`${isWishlist ? "#121212" : "white"}`} />
                    </span>
                </Button>
            </div>


            {/* |---NAME, PRICE, RATING---| */}
            {/* TODO - `props.rating` bilan bog'liq condition larni optimize qilaman */}
            <div className={`${props.rating ? "text-left" : "text-center"} py-2 font-semibold`}>
                <div className='flex items-end justify-between'>
                    <div className='max-md:w-9/12 w-full '>
                        {
                            props.rating
                                ? <Rating initialValue={props.rating ?? 2} size={20} readonly />
                                : null
                        }
                        <h3 className={`md:text-sm text-xs ${props.rating ? "text-left" : "text-center"} line-clamp-1`}>{props.name}</h3>
                        <div className={`${props.rating ? "" : "justify-center"} flex gap-2`}>
                            <p className='md:text-sm text-xs'>{props.price}$</p>
                            {
                                props.discount > 0
                                    ? <del className='text-stone-300 font-thin md:text-sm text-xs'>{props.price}$</del>
                                    : null
                            }
                        </div>
                    </div>

                    {/* Visible on mobile cart btn */}
                    <div className='max-md:flex hidden w-3/12 justify-end'>
                        {/* <Button variant={'outline'} size={'icon'} className={`rounded-none border-none`} onClick={() => onCart()}>
                            <CartIcon
                                width={20}
                                height={20}
                                color={`${productIdsForCart.includes(props.id) ? "white" : "#121212"}`}
                                type={`${productIdsForCart.includes(props.id) ? "in" : "add"}`}
                            />
                        </Button> */}
                        <ProductCartModal img={props.photo} isCartItem={productIdsForCart.includes(props.id)} id={props.id} />
                    </div>
                </div>
            </div>

            {/* |---HOVERABLE ELEMENTS---| */}
            <div className='group-hover:visible group-hover:opacity-100 invisible opacity-0 duration-200 max-md:hidden'>
                <div className='flex flex-col gap-2 absolute right-3 top-20'>
                    {/* TODO - `test.includes(props.id)` ning o'rniga optimalroq yechim kerak */}
                    <Button variant={'outline'} size={'icon'} className={`rounded-none border-none`} onClick={() => onLike()}><LikeIcon color={`${isWishlist ? "#121212" : "white"}`} /></Button>
                    <Button variant={'outline'} size={'icon'} className="rounded-none border-none"> <Link to={`/product/details/${props.id}`} className='w-full h-full flex items-center justify-center'><EyeIcon /></Link></Button>
                    {/* <Button variant={'outline'} size={'icon'} className={`rounded-none border-none`} onClick={() => onCart()}>
                        <CartIcon
                            width={25}
                            height={25}
                            color={`${productIdsForCart.includes(props.id) ? "white" : "#121212"}`}
                            type={`${productIdsForCart.includes(props.id) ? "in" : "add"}`}
                        />
                    </Button> */}
                    <ProductCartModal img={props.photo} isCartItem={productIdsForCart.includes(props.id)} id={props.id} />
                </div>
            </div>
        </div>
    )
}