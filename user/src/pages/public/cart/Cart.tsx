import { ReactElement, useState } from 'react'

import { Button } from '@/components/ui/button'
import { DeleteIcon } from '@/assets/icons'

// type Props = {

// }

export const Cart = (/*props: Props*/): ReactElement => {

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

  const products = [1, 2, 3, 4, 5, 6]

  return (
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
            products.map((i: any) => (
              <tr key={i} className='text-left border-b'>
                <td className='py-5'>
                  <div className='flex items-center gap-2'>
                    {/* IMAGE */}
                    <div className='w-20 h-32'>
                      <img src="https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247" alt="" className='w-full h-full object-cover' />
                    </div>

                    <div className='flex flex-col items-start gap-3'>
                      {/* PRODUCT NAME AND INFO */}
                      <div className='flex flex-col gap-1'>
                        <h3 className='sm:text-base text-sm font-semibold line-clamp-1'>Palto</h3>
                        <p className='sm:text-sm text-xs'>Size: 2xl, Color: qizil</p>
                      </div>

                      {/* DELETE */}
                      <Button variant={'outline'} className='border-none p-0 m-0 h-fit'>
                        <span className='flex items-end gap-1'>
                          <DeleteIcon /> <p>O'chirish</p>
                        </span>
                      </Button>
                    </div>
                  </div>
                </td>
                <td className='py-5'>
                  {/* INCREESE AND DECREESE */}
                  <div className='rounded-md border flex items-center justify-between w-24 py-1'>
                    <Button variant={'outline'} size={'icon'} disabled={count <= 1} onClick={() => decreese()} className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'>-</Button>
                    <p className='font-medium'>{count}</p>
                    <Button variant={'outline'} size={'icon'} disabled={count >= 10} onClick={() => increese()} className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'>+</Button>
                  </div>

                </td>
                <td className='py-5'>$80.0</td>
                <td className='py-5'>$80.0</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}