import { ReactElement } from 'react'
import { useSelector } from "react-redux"
import { AxiosResponse, AxiosError } from 'axios'

import { CartSkeleton, ProductCartItem } from "@/components"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { RootState, /* useAppDispatch*/ } from "@/redux"
import { useFetch } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'
import { CustomSuspanse } from '@/components/common'

// type Props = {}

export const Checkout = (/*props: Props*/): ReactElement => {
  const cart = useSelector((state: RootState) => state.cart)

  const { isLoading, machineId, isError, userData } = getMachineId()


  const userCarts = useFetch<AxiosResponse, AxiosError>(["user-carts"], `carts/?session_id=${isError ? machineId : userData?.data.id}`, false, !isLoading)

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
    <div className='py-10 w-[90%] mx-auto'>
      <h1 className='text-3xl font-medium text-center mb-10'>Buyurtmani rasmiylashtirish</h1>
      <div className='flex gap-10 items-start'>
        {/* LEFT SIDE */}
        <div className='w-2/3'>
          <p className='text-center mb-5'>Returning customer? <b className='ml-2 cursor-pointer'>Click here to login</b></p>

          {/* begin::Customer information */}
          <div className='border-2 p-5 rounded-md'>
            <h2 className='text-2xl font-medium mb-5'>Contact infromation</h2>

            <div className='flex justify-between gap-10'>
              {/* First name */}
              <div className='w-1/2'>
                <Label htmlFor="first_name">First name</Label>
                <Input id='first_name' type="email" placeholder="First name" />
              </div>

              {/* Last name */}
              <div className='w-1/2'>
                <Label htmlFor="last_name">Last name</Label>
                <Input id='last_name' type="email" placeholder="Last name" />
              </div>
            </div>

            {/* Email address */}
            <div className='mt-5'>
              <Label htmlFor="email">Email address</Label>
              <Input id='email' type="email" placeholder="Email address" />
            </div>

          </div>
          {/* end::Customer information */}

          {/* begin::Shipping address */}
          <div className='border-2 p-5 rounded-md mt-10'>
            <h2 className='text-2xl font-medium mb-5'>Shipping address</h2>

            {/* Street address */}
            <div className='mt-5'>
              <Label htmlFor="street_address">Street address *</Label>
              <Input id='street_address' type="text" placeholder="Street address" />
            </div>

            {/* Country */}
            <div className='mt-5'>
              <Label htmlFor="firs_name">Country *</Label>
              <Select>
                <SelectTrigger className="w-full border">
                  <SelectValue placeholder="Select a Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uzb">Uzbekistan</SelectItem>
                  <SelectItem value="usa">Usa</SelectItem>
                  <SelectItem value="turkey">Turkey</SelectItem>
                  <SelectItem value="ozarbayjon">Ozarbayjon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tow /  City */}
            <div className='mt-5'>
              <Label htmlFor="town_city">Tow /  City *</Label>
              <Input id='town_city' type="text" placeholder="Tow /  City" />
            </div>

            <div className='flex justify-between gap-10 mt-5'>
              {/* State */}
              <div className='w-1/2'>
                <Label htmlFor="state">State</Label>
                <Input id='state' type="text" placeholder="State" />
              </div>

              {/* Zip code */}
              <div className='w-1/2'>
                <Label htmlFor="zip_code">Zip code</Label>
                <Input id='zip_code' type="text" placeholder="Zip code" />
              </div>
            </div>
          </div>
          {/* end::Shipping address */}

          <p className='my-5'>Your personal data will be used to process your order, support your experience <br /> throughout this website, and for other purposes described in our <a href="#" className='font-medium'>privacy policy</a>.</p>

          <Button className='w-full text-lg p-7' >Buyurtmani rasmiylashtirish</Button>
        </div>

        {/* RIGHT SIDE */}
        <div className='w-1/3 border-2 p-5 rounded-md'>
          <h2 className='text-2xl font-medium mb-5'>Sizning buyurtmangiz</h2>

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

          <div className='rounded-lg sm:border-2 border border-[#CBCBCB] sm:p-3 p-2 w-full'>
            <p className='font-bold sm:text-lg text-sm mb-3'>Jami</p>
            <p className='font-medium flex justify-between mb-3 max-sm:text-xs'><span>{cart?.ids.length} ta maxsulot narxi</span> --------------------- <span>${totalPrice()}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

