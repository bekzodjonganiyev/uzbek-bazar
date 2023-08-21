import { ReactElement, useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { DeleteIcon } from '@/assets/icons'

type Props = {
    id: number,
    img: string,
    productName: string,
    price: string,
    info: { size: string, color: string },
}

export const ProductCartItem = (props: Props): ReactElement => {
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
        <div className='flex items-end justify-between mb-3 pb-3 border-b'>
            <div className='flex items-start gap-2'>
                {/* IMAGE */}
                <div className='w-20 h-32'>
                    <img src={props.img} alt={props.productName} className='w-full h-full object-cover' />
                </div>
                
                <div className='flex flex-col items- justify-between gap-2 w-[60%]'>
                    {/* PRODUCT NAME AND INFO */}
                    <div className='flex flex-col gap-0'>
                        <h3 className='sm:text-base text-sm font-semibold line-clamp-1'>{props.productName}</h3>
                        <p className='sm:text-sm text-xs'>Size: {props.info.size}, Color: {props.info.color}</p>
                    </div>

                    {/* INCREESE AND DECREESE */}
                    <div className='rounded-md border flex items-center justify-between w-24 py-1'>
                        <Button variant={'outline'} size={'icon'} disabled={count <= 1} onClick={() => decreese()} className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'>-</Button>
                        <p className='font-medium'>{count}</p>
                        <Button variant={'outline'} size={'icon'} disabled={count >= 10} onClick={() => increese()} className='border-none text-2xl font-extrabold p-0 m-0 h-8 w-8'>+</Button>
                    </div>

                    <div className='flex items-center gap-2 min-[400px]:hidden'>
                        {/* PRICE */}
                        <div>
                            <p className='font-bold'>{props.price}</p>
                        </div>

                        {/* DELETE */}
                        <Button variant={'outline'} className='border-none p-0 m-0 h-fit'>
                            <DeleteIcon />
                        </Button>
                    </div>

                </div>
            </div>
            
            <div className='min-[400px]:flex items-center gap-2 hidden'>
                {/* PRICE */}
                <div>
                    <p className='font-bold'>{props.price}</p>
                </div>

                {/* DELETE */}
                <Button variant={'outline'} className='border-none p-0 m-0 h-fit'>
                    <DeleteIcon />
                </Button>
            </div>

        </div>
    )
}