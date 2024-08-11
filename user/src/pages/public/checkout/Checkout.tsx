import { ChangeEvent, ReactElement, useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios'

import { CartSkeleton, ProductCartItem } from "@/components"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import { useFetch, usePost } from '@/utils/api'
import { getMachineId } from '@/utils/getSeesionId'
import { CustomSuspanse } from '@/components/common'
import ReactInputMask from 'react-input-mask'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

// type Props = {}

export const Checkout = (/*props: Props*/): ReactElement => {
  const { isLoading } = getMachineId()
  const userCarts = useFetch<AxiosResponse, AxiosError>(["user-carts"], `carts/`, true, !isLoading)
  const orderMudation = usePost("post", () => {
    toast({
      description: "Buyurtma muvaffaqiyatli yaratildi",
      variant: "success",
    })

    setTimeout(() => {
      window.location.href = "/user-profile/orders"
    }, 2000);
  }, () => alert('xatolik'), true)

  const [values, setValues] = useState<any>({})

  const totalPrice = () => {
    let summ: number = 0
    userCarts.isFetched && userCarts.data?.data?.results.forEach(
      (item: any) => {
        summ = summ + item.quantity * item.product.price
      }
    )
    return summ
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues((prev: any) => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {
    if (Object.values(values).length < 8) {
      toast({
        description: "Barcha maydon to'ldirilishi shart",
        variant: "danger",
      })
      return
    }

    const obj = {
      phone: values.phone,
      address: Object.values(values).join(" ").replace(`${values.phone}`, "")
    }

    orderMudation.mutate({ data: obj, url: "/orders/" })
    console.log(obj)
  }
  return (
    <div className='py-10 w-[90%] mx-auto'>
      <h1 className='text-3xl font-medium text-center mb-10'>Buyurtmani rasmiylashtirish</h1>
      <div className='flex gap-10 items-start'>
        {/* LEFT SIDE */}
        <div className='w-2/3'>

          {/* begin::Customer information */}
          <div className='border-2 p-5 rounded-md'>
            <h2 className='text-2xl font-medium mb-5'>Contact infromation</h2>

            <div className='flex justify-between gap-10'>
              {/* First name */}
              <div className='w-1/2'>
                <Label htmlFor="first_name">First name</Label>
                <Input required onChange={changeHandler} id='first_name' name='first_name' type="text" placeholder="First name" />
              </div>

              {/* Last name */}
              <div className='w-1/2'>
                <Label htmlFor="last_name">Last name</Label>
                <Input required onChange={changeHandler} id='last_name' name='last_name' type="text" placeholder="Last name" />
              </div>
            </div>

            {/* Email address */}
            <div className='mt-5'>
              <Label htmlFor="phone">Email address</Label>
              <ReactInputMask
                className={cn(
                  "flex h-10 w-full rounded-md border border-input required bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
                onChange={changeHandler}
                name='phone'
                mask="+\9\98 (99) 999-99-99"
                maskChar={null}
                placeholder='+998 (90) 000-00-00'
              />
            </div>

          </div>
          {/* end::Customer information */}

          {/* begin::Shipping address */}
          <div className='border-2 p-5 rounded-md mt-10'>
            <h2 className='text-2xl font-medium mb-5'>Shipping address</h2>

            {/* Street address */}
            <div className='mt-5'>
              <Label htmlFor="street_address">Street address *</Label>
              <Input required onChange={changeHandler} id='street_address' name='street_address' type="text" placeholder="Street address" />
            </div>

            {/* Country */}
            <div className='mt-5'>
              <Label htmlFor="firs_name">Country *</Label>
              <Select onValueChange={(e) => setValues({ ...values, region: e })}>
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
              <Input required onChange={changeHandler} id='town_city' name='town_city' type="text" placeholder="Tow /  City" />
            </div>

            <div className='flex justify-between gap-10 mt-5'>
              {/* State */}
              <div className='w-1/2'>
                <Label htmlFor="state">State</Label>
                <Input required onChange={changeHandler} id='state' name='state' type="text" placeholder="State" />
              </div>

              {/* Zip code */}
              <div className='w-1/2'>
                <Label htmlFor="zip_code">Zip code</Label>
                <Input required onChange={changeHandler} id='zip_code' name='zip_code' type="text" placeholder="Zip code" />
              </div>
            </div>
          </div>
          {/* end::Shipping address */}

          <Button onClick={() => onSubmit()} className='w-full text-lg p-7 mt-5' >Buyurtmani rasmiylashtirish</Button>
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
            <div className=''>
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
            <p className='font-medium flex items-center justify-between gap-2 mb-3 max-sm:text-xs'><span>{userCarts.data?.data?.results?.length} ta maxsulot narxi</span> <span className='flex-1 border border-dashed border-black'></span> <span>${totalPrice()}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

