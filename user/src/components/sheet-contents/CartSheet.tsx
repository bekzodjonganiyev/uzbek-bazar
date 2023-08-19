import { ReactElement } from 'react'
import { useSelector } from "react-redux"

import { SheetHeader, SheetTitle } from "@/components/ui/sheet"

import { RootState, useAppDispatch } from "@/redux"
import { ProductCardActions } from "@/redux/actions"

interface Props {}

export const CartSheet = (props: Props):ReactElement  => {
  const dispatch = useAppDispatch()
  const product = useSelector((state: RootState) => state.product)
  const cart = product.cart
  
  return (
    <aside>
        <SheetHeader>
            <SheetTitle className='text-2xl font-semibold'>Savatcha</SheetTitle>
        </SheetHeader>

        <div>Savatda {cart.length} ta product bor</div>
        <div>
            {
                cart.map(item => (
                    <p>{item}</p>
                ))
            }
        </div>
    </aside>
  )
}