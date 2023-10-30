import { useState } from "react"
import { Link } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import { DownIcon } from "@/assets/icons";

import { useFetch } from "@/utils/api"


type Props = {
  open: boolean,
  close: () => void
}
export const Menu = (props: Props) => {
  const { data, isLoading, isError } = useFetch<AxiosResponse, AxiosError>(["categories"], "categories/", false)

  const [subCategories, setSubCategories] = useState<any[]>([])
  const [selected, setSelected] = useState<{ title: string, id: number }>({ title: "", id: 0 })

  const onHover = (arr: any[], id: number, title: string) => {
    setSubCategories(arr)
    setSelected({ title: title, id: id })
  }
  return (
    <div className={`absolute top-full duration-300 bg-card-bg p-5 w-full shadow-2xl md:block hidden ${props.open ? "opacity-1 z-50" : "opacity-0 -z-50"}`}>
      <div className="flex">

        {/* ------BIG CATEGORIES------ */}
        <div className="w-[30%] overflow-y-scroll overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-thumb-r h-96 border-zinc-300 pr-5">
          <ul className="space-y-2 w-96">
            {
              !isLoading && !isError
                ? data?.data?.results.map((item: any) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between gap-2 hover:bg-white px-4 py-2 rounded-md cursor-pointer ${selected.id === item.id ? "bg-white" : ""}`}
                    onMouseEnter={() => onHover(item.subcategories, item.id, item.name)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={item.icon} alt={item.name} className="w-8 h-8 object-cover rounded-full" />
                      <p>{item.name}</p>
                    </div>
                    <DownIcon rotate="-rotate-90" />
                  </li>
                ))
                : null
            }
          </ul>
        </div>

        {/* ------SUB CATEGORIES------ */}
        <div className="w-[70%]">
          <h1 className="font-medium text-2xl mb-5">{selected.title}</h1>
          <div className="grid grid-cols-4 gap-5">
            {
              subCategories.map(i => (
                <div>
                  <Link
                    to={{
                      pathname: `/catalog/${i.slug}`,
                    }}
                    state={{ category_id: i.id }}
                    className="leading-[18px] mb-3 text-lg font-medium"
                    onClick={() => { props.close() }}
                  >
                    {i.name}</Link>
                  <ul>
                    {
                      i?.subcategories && i?.subcategories.length > 0
                        ? i?.subcategories?.map((category: any) => (
                          <li>
                            <Link
                              to={{
                                pathname: `/catalog/${category.slug}`,
                              }}
                              state={{ category_id: category.id }}
                              onClick={() => { props.close() }}>{category.name}
                            </Link>
                          </li>
                        ))
                        : null
                    }
                  </ul>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
