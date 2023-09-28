import { ReactElement, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/assets/icons'
import { CustomSuspanse } from '@/components/common'

import { usePost, useFetch } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'

// type Props = {

// }

export const Cart = (/*props: Props*/): ReactElement => {
  const carts = useFetch<AxiosResponse, AxiosError>([`user-carts?session_id=${getMachineId()}`], "carts/")

  return (
    <CustomSuspanse
      loading={carts.isLoading}
      loadingFallback={"Loading"}
      error={carts.isError}
      errorFallback={carts.error?.message}
    >
      <div className='py-10 w-[90%] mx-auto'>
        <h1 className='text-3xl font-medium text-center mb-10'>Savatcha</h1>
        <table className='w-full mb-10'>
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
      </div>
    </CustomSuspanse>
  )
}

type TableItemProps = {
  item: any
}

const TableItem = (props: TableItemProps) => {
  const cartMutate = usePost("patch")

  const [count, setCount] = useState<number>(1)

  const increese = () => {
    if (count >= 10) {
      return
    } else setCount(count + 1)
  }

  const decreese = () => {
    if (count <= 1) {
      return
    } else setCount(count - 1)
  }
  return (
    <tr className='text-left border-b'>

      {/* -----<TD>PRODUCT NAME</TD>----- */}
      <td className='py-5'>
        <div className='flex items-center gap-2'>
          {/* image */}
          <div className='w-20 h-32'>
            <img
              src={props.item.product.photo}
              alt={props.item.product.name}
              className='w-full h-full object-cover' />
          </div>

          <div className='flex flex-col items-start gap-3'>
            {/*product name and info */}
            <div className='flex flex-col gap-1'>
              <h3 className='sm:text-base text-sm font-semibold line-clamp-1'>{props.item.product.name}</h3>
              {/* <p className='sm:text-sm text-xs'>Size: 2xl, Color: qizil</p> */}
            </div>

            {/* delete */}
            <Button variant={'outline'} className='border-none p-0 m-0 h-fit'>
              <span className='flex items-end gap-1'>
                <DeleteIcon /> <p>O'chirish</p>
              </span>
            </Button>
          </div>
        </div>
      </td>

      {/* -----<TD>COUNTER</TD>----- */}
      <td className='py-5'>
        {/* INCREESE AND DECREESE */}
        <div className='rounded-md border flex items-center justify-between w-24 py-1'>
          <Button
            variant={'outline'}
            size={'icon'}
            disabled={count <= 1}
            onClick={() => {
              decreese()
              cartMutate.mutate({ url: `carts/${props.item.id}/`, data: { quantity: count } })
            }}
            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8 cursor-pointer'
          >
            -
          </Button>
          <p className='font-medium'>{count}</p>
          <Button
            variant={'outline'}
            size={'icon'}
            disabled={count >= 10}
            onClick={() => increese()}
            className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8 cursor-pointer'
          >
            +
          </Button>
        </div>
      </td>

      {/* -----<TD>PRICE</TD>----- */}
      <td className='py-5'>${props.item.product.price}</td>

      {/* -----<TD>TOTAL PRICE</TD>----- */}
      <td className='py-5'>$80.0</td>
    </tr>
  )
}