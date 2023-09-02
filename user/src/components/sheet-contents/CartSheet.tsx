import { ReactElement } from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'

import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'

import { ProductCartItem } from "@/components" 

import { RootState, useAppDispatch } from "@/redux"
import { ProductCardActions } from "@/redux/actions"
const { deleteCartId } = new ProductCardActions()

import { products } from "@/utils/mocks"

interface Props {}

export const CartSheet = (props: Props):ReactElement  => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const product = useSelector((state: RootState) => state.product)
  const cart = product.cart
  
  return (
    <aside className='flex flex-col sm:gap-3 gap-2 items-center'>
        <SheetHeader>
            <SheetTitle className='sm:text-2xl text-lg font-semibold'>Savatcha</SheetTitle>
        </SheetHeader>

        {/* PRODUCT LIST */}
        <div className='overflow-y-scroll scrollbar-none scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-[430px]'>
            {
                products.map(item => (
                    <ProductCartItem 
                        id={item.id}   
                        img={item.img}
                        info={{size: item.size, color: item.color}}
                        price={item.price}
                        productName={item.productName}
                    />
                ))
            }
        </div>

        {/* TOTAL COUNT */}
        <div className='rounded-lg sm:border-2 border border-[#CBCBCB] sm:p-3 p-2 w-full'>
            <p className='font-bold sm:text-lg text-sm mb-3'>Jami</p>
            <p className='font-medium flex justify-between mb-3 max-sm:text-xs'><span>{cart.length} ta maxsulot narxi</span> <span>$240.00</span></p>
            <SheetClose className='w-full'><Button size={'lg'} className='w-full max-sm:text-xs' onClick={() => navigate("/checkout")}>Buyurtma berish</Button></SheetClose>
        </div>

        <Link to="/cart" className='border-b-2 border-black w-fit font-medium'><SheetClose>Savatni ko’rish</SheetClose></Link>
    </aside>
  )
}