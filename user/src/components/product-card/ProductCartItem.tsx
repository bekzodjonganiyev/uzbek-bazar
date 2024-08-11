import { ReactElement } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from "@/components/ui/button"
import { DeleteIcon } from '@/assets/icons'

import { useAppDispatch } from "@/redux"
import { deleteCartId } from "@/redux/actions/cart-action"
import { usePost } from '@/utils/api'

type Props = {
    id: number,
    productId: number,
    img: string,
    productName: string,
    price: string,
    count: number
}

export const ProductCartItem = (props: Props): ReactElement => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()

    const cartMutate = usePost(
        "patch",
        () => queryClient.invalidateQueries({ queryKey: ["user-carts"] }),
        () => { },
        true
    )

    const cartDelete = usePost(
        "delete",
        () => queryClient.invalidateQueries({ queryKey: ["user-carts"] }),
        () => { },
        true
    )

    return (
        <div className={`flex items-end justify-between mb-3 pb-3 border-b ${cartDelete.isLoading ? "opacity-60 pointer-events-none cursor-not-allowed" : ""}`}>
            <div className='flex items-start gap-2'>
                {/* IMAGE */}
                <div className='w-20 h-32'>
                    <img src={props.img} alt={props.productName} className='w-full h-full object-cover' />
                </div>

                <div className='flex flex-col items- justify-between gap-2 w-[60%]'>
                    {/* PRODUCT NAME AND INFO */}
                    <div className='flex flex-col gap-0'>
                        <h3 className='sm:text-base text-sm font-semibold line-clamp-2 leading-none'>{props.productName}</h3>
                        {/* <p className='sm:text-sm text-xs'>Size: 2xl, Color: qizil</p> */}
                    </div>

                    {/* INCREESE AND DECREESE */}
                    <div className={`rounded-md border flex items-center justify-between w-24 py-1 ${cartMutate.isLoading ? "opacity-60 pointer-events-none cursor-not-allowed" : "opacity-1"}`}>
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            disabled={props.count <= 1}
                            onClick={() => {
                                props.count >= 1
                                    ? cartMutate.mutate({ url: `carts/${props.id}/`, data: { quantity: props.count - 1 } })
                                    : null
                            }}
                            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'
                        >
                            -
                        </Button>
                        <p className='font-medium'>{props.count}</p>
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            onClick={() => {
                                cartMutate.mutate({ url: `carts/${props.id}/`, data: { quantity: props.count + 1 } })
                            }}
                            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'
                        >
                            +
                        </Button>
                    </div>

                    <div className='flex items-center gap-2 min-[400px]:hidden'>
                        {/* PRICE */}
                        <div>
                            <p className='font-bold'>${props.price}</p>
                        </div>

                        {/* DELETE */}
                        <Button
                            variant={'outline'}
                            className='border-none p-0 m-0 h-fit'
                            onClick={() => cartDelete.mutate({ url: `carts/${props.id}`, data: null })}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>

                </div>
            </div>

            <div className='min-[400px]:flex items-center gap-2 hidden'>
                {/* PRICE */}
                <div>
                    <p className='font-bold'>${props.price}</p>
                </div>

                {/* DELETE */}
                <Button
                    variant={'outline'}
                    className='border-none p-0 m-0 h-fit'
                    onClick={() => {
                        cartDelete.mutateAsync({ url: `carts/${props.id}`, data: null })
                            .then(res => res.status === 200 ? dispatch(deleteCartId(props.productId, props.id, "")) : "")
                    }}
                >
                    <DeleteIcon />
                </Button>
            </div>

        </div>
    )
}