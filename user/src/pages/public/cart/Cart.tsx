import { ReactElement } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'

// import { useAppDispatch } from '@/redux'
// import { deleteCartId } from '@/redux/actions/cart-action'
import { usePost, useFetch } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'

// type Props = {

// }
export const Cart = (/*props: Props*/): ReactElement => {
  const { isLoading } = getMachineId()

  const carts = useFetch<AxiosResponse, AxiosError>([`user-carts`], `carts/`, true, !isLoading)
  return (
    <CustomSuspanse
      loading={carts.isLoading}
      loadingFallback={"Loading"}
      error={carts.isError}
      errorFallback={carts.error?.message}
    >
      <>
        <h1 className='text-3xl font-medium text-center my-5'>Savatcha</h1>
        <div className='py-10 w-[90%] mx-auto max-md:overflow-x-scroll '>
          <table className='w-full mb-10 '>
            <thead>
              <tr className='text-left border-b py-3'>
                <th className='py-3'>Mahsulot</th>
                <th className='py-3'>Miqdori</th>
                <th className='py-3'>Narxi</th>
                <th className='py-3'>Jami</th>
              </tr>
            </thead>
            <tbody>
              {
                carts.data?.data.results.map((i: any) => (
                  <TableItem key={i.id} item={i} />
                ))
              }
            </tbody>
          </table>
          {/* <Button onClick={() => cartMutate.mutate({ url: "carts/97/", data: { quantity: 100 } })}>OK</Button> */}
        </div></>
    </CustomSuspanse>
  )
}

type TableItemProps = {
  item: any
}

const TableItem = (props: TableItemProps) => {
  const queryClient = useQueryClient()
  // const dispatch = useAppDispatch()

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
    <tr className={`text-left border-b ${cartDelete.isLoading ? "opacity-60 pointer-events-none cursor-not-allowed" : ""}`}>
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
              <p className='sm:text-sm text-xs'>Color: {props.item.product.color?.name ?? '|color|'}, Size: {props.item.size.name ?? "|size|"}</p>
            </div>

            {/* delete */}
            <Button
              variant={'outline'}
              className='border-none p-0 m-0 h-fit'
              onClick={() => cartDelete.mutate({ url: `carts/${props.item.id}`, data: null })}>
              <span className='flex items-end gap-1'>
                <DeleteIcon /> <p>O'chirish</p>
              </span>
            </Button>
          </div>
        </div>
      </td>

      {/* -----<TD>COUNTER</TD>----- */}
      <td className='py-5 px-3'>
        {/* INCREESE AND DECREESE */}
        <div className={`rounded-md border flex items-center justify-between w-24 py-1 ${cartMutate.isLoading ? "opacity-60 pointer-events-none cursor-not-allowed" : "opacity-1"}`}>
          <Button
            variant={'outline'}
            size={'icon'}
            disabled={props.item.quantity <= 1}
            onClick={() => {
              props.item.quantity >= 1
                ? cartMutate.mutate({ url: `carts/${props.item.id}/`, data: { quantity: props.item.quantity - 1 } })
                : null
            }}
            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8 cursor-pointer'
          >
            -
          </Button>
          <p className='font-medium'>{props.item.quantity}</p>
          <Button
            variant={'outline'}
            size={'icon'}
            // disabled={count >= 10}
            onClick={() => {
              cartMutate.mutate({ url: `carts/${props.item.id}/`, data: { quantity: props.item.quantity + 1 } })
            }}
            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8 cursor-pointer'
          >
            +
          </Button>
        </div>
      </td>

      {/* -----<TD>PRICE</TD>----- */}
      <td className='py-5 px-3'>${props.item.product.price}</td>

      {/* -----<TD>TOTAL PRICE</TD>----- */}
      <td className='py-5 px-3'>${props.item.quantity * props.item.product.price}</td>
    </tr>
  )
}