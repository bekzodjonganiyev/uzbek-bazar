import { useFetch } from "@/utils/api"
import { AxiosError, AxiosResponse } from "axios"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { dateFormatter } from "@/utils/date-formatter"

// type Props = {}
export const UserProfileOrders = (/*props: Props*/) => {
  const fetchOrders = useFetch<AxiosResponse, AxiosError>(["user-orders"], "/orders/", true, true)
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        {
          fetchOrders.isFetched && fetchOrders.data?.data.results.map((order:any) => (
            <AccordionItem value={order.id} className="px-4 py-2 border shadow rounded-md mb-3">
              <AccordionTrigger className="hover:no-underline flex items-center justify-between">
                <p>{order.user}</p>
                <span>{dateFormatter(order.created_at)}</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col">
                  <li className="flex items-center gap-2"><span>#ID</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.id}</span></li>
                  <li className="flex items-center gap-2"><span>Status</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.status}</span></li>
                  <li className="flex items-center gap-2"><span>Telefon raqam</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.phone}</span></li>
                  <li className="flex items-center gap-2"><span>Umumiy summa</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.total}</span></li>
                  <li className="flex items-center gap-2"><span>Manzil</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.address}</span></li>
                  <li className="flex items-center gap-2"><span>Maxsulotlar soni</span> <span className="flex-1 border border-dashed border-gray-300"></span> <span>{order.total_quantity}</span></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))
        }

      </Accordion>
      {

      }
    </div>
  )
}