import { useNavigate } from 'react-router-dom'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { AxiosError, AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'

import { RootState, useAppDispatch } from '@/redux'
import { deleteCartId, setCartId } from '@/redux/actions/cart-action'
import { usePost, useFetch } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'


// type Props = {}

export const Favourite = (/*props: Props*/): ReactElement => {
    const machineId = getMachineId()

    const favourites = useFetch<AxiosResponse, AxiosError>(
        [`user-favourites`],
        `favorites/?session_id=${machineId}`,
        false
    )
    return (
        <CustomSuspanse
            loading={favourites.isLoading}
            loadingFallback={"Loading"}
            error={favourites.isError}
            errorFallback={favourites.error?.message}
        >
            <>
                <h1 className='text-3xl font-medium text-center mb-5'>Savatcha</h1>
                <div className='py-10 w-[90%] mx-auto max-md:overflow-x-scroll '>
                    <table className='w-full mb-10 '>
                        <thead>
                            <tr className='text-left border-b py-3'>
                                <th className='py-3'>Mahsulot</th>
                                <th className='py-3'>Narxi</th>
                                <th className='py-3'>Savat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                favourites.data?.data.results.map((i: any) => (
                                    <TableItem key={i.id} item={i} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        </CustomSuspanse>
    )
}

type TableItemProps = {
    item: any
}

const TableItem = (props: TableItemProps) => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { toast } = useToast()

    const machineId = getMachineId()

    const favouriteDelete = usePost("delete", () => {
        queryClient.invalidateQueries({ queryKey: ["user-favourites"] })
        dispatch(deleteCartId(props.item.product.id, props.item.id, ""))
    })

    const cartMutate = usePost("post", () => {
        queryClient.invalidateQueries({ queryKey: ["user-carts"] })
        dispatch(setCartId(props.item.product.id, 1, 1))
        toast({
            description:"Maxsulot savatga qo'shildi",
            variant: "success",
            action: <ToastAction
                className="bg-white text-black text-xs font-bold"
                altText="Try again"
                onClick={() => navigate("/cart")}
            >
                Savatga o'tish
            </ToastAction>,
        })
    })

    const cart = useSelector((state: RootState) => state.cart)
    const productIdsForCart = cart?.ids.map((i) => i.id)

    return (
        <tr className={`text-left border-b ${favouriteDelete.isLoading ? "opacity-60 pointer-events-none cursor-not-allowed" : ""}`}>
            {/* -----<TD>PRODUCT NAME</TD>----- */}
            <td className='py-5 px-3 w-1/2'>
                <div className='flex items-center gap-2'>
                    {/* image */}
                    <div className='w-20 h-32'>
                        <img
                            src={props.item.product.photo ?? "https://storage.kun.uz/source/thumbnails/_medium/9/sSOEwvT85NZVoYkcpfA6XOwG4rw8826l_medium.jpg"}
                            alt={props.item.product.name}
                            className='w-full h-full object-cover' />
                    </div>

                    <div className='flex flex-col items-start gap-3'>
                        {/*product name and info */}
                        <div className='flex flex-col gap-1'>
                            <h3 className='sm:text-base text-sm font-semibold line-clamp-2 w-64'>{props.item.product.name}</h3>
                            <p className='sm:text-sm text-xs'>Color: {props.item.product.color?.name ?? '|color|'}, Size: {props.item.product.size ?? "|size|"}</p>
                        </div>

                        {/* delete */}
                        <Button
                            variant={'outline'}
                            className='border-none p-0 m-0 h-fit'
                            onClick={() => favouriteDelete.mutate({ url: `favorites/${props.item.id}/`, data: {} })}>
                            <span className='flex items-end gap-1'>
                                <DeleteIcon /> <p>O'chirish</p>
                            </span>
                        </Button>
                    </div>
                </div>
            </td>

            {/* -----<TD>PRICE</TD>----- */}
            <td className='py-5 px-3'>${props.item.product.price}</td>

            {/* -----<TD>TOTAL PRICE</TD>----- */}
            <td className='py-5 px-3'>
                <button
                    className={`py-2 px-4 rounded-md ${productIdsForCart.includes(props.item.product.id)
                        ? "bg-black text-white"
                        : "border border-black text-black"}`
                    }
                    onClick={() => {
                        if (!productIdsForCart.includes(props.item.product.id)) {
                            cartMutate.mutate({
                                url: `carts/`,
                                data: {
                                    session_id: machineId, // TODO - login qilinganda null ketadi
                                    quantity: 1,
                                    product: props.item.product.id,
                                    user: null // TODO - login qilinganda user_id ketadi
                                }
                            })
                        }
                        // ! && dispatch(setCartId(props.item.product.id, 1, 1))
                    }}
                >
                    {
                        productIdsForCart.includes(props.item.product.id)
                            ? "Savatda"
                            : "Savatga"
                    }
                </button>
            </td>
        </tr>
    )
}