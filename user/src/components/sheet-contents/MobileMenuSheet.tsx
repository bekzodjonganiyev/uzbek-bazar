import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse, AxiosError } from 'axios'
import { BarChart, LucideBanknote, ShoppingBag } from 'lucide-react'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CustomSelect, CustomSuspanse } from '@/components/common'
import { FiltersSkeleton } from "@/components"

import { useFetch } from '@/utils/api'
import { currencys } from '@/utils/mocks'
import { languages } from '@/components'

// interface Props {}

export const MobileMenuSheet = (/*props: Props*/): ReactElement => {
  const categories = useFetch<AxiosResponse, AxiosError>(["categories"], "categories/", false)

  console.log(categories.data?.data?.results)

  return (
    <aside className='z-[9999] h-full'>
      <ScrollArea className='h-full'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-semibold'>Katalog</SheetTitle>
        </SheetHeader>
        <CustomSuspanse
          loading={categories.isLoading}
          loadingFallback={<FiltersSkeleton limit={9} />}
          error={categories.isError}
          errorFallback={"Error"}
        >
          <Accordion type="single" collapsible className="w-full">
            {
              categories.data?.data?.results.map((item: any) => (
                <AccordionItem value={item.id} className='border-none' key={item.id}>
                  <AccordionTrigger className='py-2'>
                    <div className='flex items-center gap-5'>
                      <img src={item.icon} alt={item.name} className='w-10 h-10 rounded-full' />
                      <p>{item.name}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      <li>
                        <Link
                          to={{ pathname: `/catalog/${item.slug}`, }}
                          state={{ category_id: item.id }}
                        >
                          <SheetClose>
                            {item.name}
                          </SheetClose>
                        </Link>
                      </li>
                      {
                        item?.subcategories?.map((subItem: any) => (
                          <li key={subItem.id} className='my-2'>
                            <Link
                              to={{ pathname: `/catalog/${subItem.slug}`, }}
                              state={{ category_id: subItem.id }}
                            >
                              <SheetClose>
                                {subItem.name}
                              </SheetClose>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        </CustomSuspanse>

        <hr className='border my-5' />

        <ul>
          <li className='my-3'>
            <Link to="/sellers">
              <SheetClose>
                <p className='flex items-center gap-5'>
                  <ShoppingBag color="black" />
                  <span>Do'konlar</span>
                </p>
              </SheetClose>
            </Link>
          </li>
          <li className='my-3'>
            <Link to="/top-products">
              <SheetClose>
                <p className='flex items-center gap-5'>
                  <BarChart color="black" />
                  <span>Top mahsulotlar</span>
                </p>
              </SheetClose>
            </Link>
          </li>
          <li className='my-3'>
            <Link to="/sell-with-us">
              <SheetClose>
                <p className='flex items-center gap-5'>
                  <LucideBanknote color="black" />
                  {/* <ShoppingBag  /> */}
                  <span>Biz bilan soting</span>
                </p>
              </SheetClose>
            </Link>
          </li>
        </ul>

        <hr className='border my-5' />

        <div className='p-2'>
          {/* |---LANG---| */}
          <CustomSelect
            width='w-full border'
            items={languages}
            changeHandler={(e) => console.log(e)}
            placeholderValue="Tilni tanlang"
            defaultValue="uz"
          />

          <br />

          {/* |---CURRENCY--- */}
          <CustomSelect
            width='w-full border'
            items={currencys}
            changeHandler={(e) => console.log(e)}
            placeholderValue="Tilni tanlang"
            defaultValue="usz"
          />
        </div>
      </ScrollArea>
    </aside>
  )
}