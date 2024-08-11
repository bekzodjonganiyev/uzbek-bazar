import { ReactElement } from 'react'
// import { useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { AxiosResponse, AxiosError } from 'axios'

import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'

import { CartSkeleton, ProductCartItem } from "@/components"

// import { RootState, /* useAppDispatch*/ } from "@/redux"
// import { ProductCardActions } from "@/redux/actions"
// const { deleteCartId } = new ProductCardActions()

import { useFetch } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'
import { CustomSuspanse } from '../common'

export const CartSheet = (/*props: Props*/): ReactElement => {
    const navigate = useNavigate()

    // const machineId = getMachineId()
    const { isLoading } = getMachineId()

    const userCarts = useFetch<AxiosResponse, AxiosError>(["user-carts", `${isLoading}`], `carts/`, true, !isLoading)

    const totalPrice = () => {
        let summ: number = 0
        userCarts.isFetched && userCarts.data?.data?.results.forEach(
            (item: any) => {
                summ = summ + item.quantity * item.product.price
            }
        )
        return summ
    }



    return (
        <aside className='flex flex-col sm:gap-3 items-center justify-between h-full'>
            <SheetHeader>
                <SheetTitle className='sm:text-2xl text-lg font-semibold'>Savatcha</SheetTitle>
            </SheetHeader>

            {/* TODO - redux stete ni localstoragedagi holatini o'chirib tashlaganda cartsni get qilmasin */}
            {/* TODO - Carts sheet ochilganda va Carts pagega kirilganda reload qilmasa ham fetch qilishi kerak */}
            {/* PRODUCT LIST */}
            <CustomSuspanse
                loading={userCarts.isLoading}
                loadingFallback={<CartSkeleton limit={5} />}
                error={userCarts.isError}
                errorFallback={"Error"}
            >
                <div className='overflow-y-scroll scrollbar-none scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 h-[430px]'>
                    {
                        userCarts.data?.data?.results?.map((item: any) => (
                            <ProductCartItem
                                key={item.id}
                                id={item.id}
                                productId={item.product.id}
                                img={item?.product?.photo ?? "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg"}
                                price={item?.product?.price}
                                count={item?.quantity}
                                productName={item?.product?.name}
                            />
                        ))
                    }
                </div>
            </CustomSuspanse>

            {/* TOTAL COUNT */}
            <>
                <div className='rounded-lg sm:border-2 border border-[#CBCBCB] sm:p-3 p-2 w-full'>
                    <p className='font-bold sm:text-lg text-sm mb-3'>Jami</p>
                    <p className='font-medium flex justify-between mb-3 max-sm:text-xs'><span>{userCarts.data?.data?.results?.length} ta maxsulot narxi</span> <span>${totalPrice()}</span></p>
                    <SheetClose className='w-full'><Button size={'lg'} className='w-full max-sm:text-xs' onClick={() => navigate("/checkout")}>Buyurtma berish</Button></SheetClose>
                </div>
                <Link to="/cart" className='border-b-2 border-black w-fit font-medium'><SheetClose>Savatni ko’rish</SheetClose></Link>
            </>
            {/* {
                cart.ids.length > 0
                    ? 
                    : <p className='mb-96'>Savatingizda hech narsa yo'q</p>
            } */}


        </aside>
    )
}