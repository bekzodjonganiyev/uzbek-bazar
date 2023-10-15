import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse, AxiosError } from 'axios'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SheetClose, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CustomSuspanse } from '@/components/common'
import { FiltersSkeleton } from "@/components"

import { useFetch } from '@/utils/api'

// interface Props {}

export const MobileMenuSheet = (/*props: Props*/): ReactElement => {
  const categories = useFetch<AxiosResponse, AxiosError>(["categories"], "categories/")

  console.log(categories.data?.data?.results)

  return (
    <aside className='z-[9999]'>
      <SheetHeader>
        <SheetTitle className='text-2xl font-semibold'>Katalog</SheetTitle>
      </SheetHeader>
      <CustomSuspanse
        loading={categories.isLoading}
        loadingFallback={<FiltersSkeleton limit={9} />}
        error={categories.isError}
        errorFallback={"Error"}
      >
        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className='border-none'>
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className='border-none'>
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className='border-none'>
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
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
    </aside>
  )
}