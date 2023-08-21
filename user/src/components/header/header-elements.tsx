import { useState } from "react"
import { AxiosError, AxiosResponse } from "axios";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { DownIcon } from "@/assets/icons";

import { cn } from "@/lib/utils"
import { useFetch } from "@/utils/api"



export const Menu = () => {
  const { data, error, isLoading, isError } = useFetch<AxiosResponse, AxiosError>(["categories"], "categories/")

  const arr = !isLoading ? [...data?.data?.results] : []
  // const arr:any = []

  const [subCategories, setSubCategories] = useState<any[]>([])
  const [selected, setSelected] = useState<number>(0)

  const onHover = (arr: any[], id: number) => {
    setSubCategories(arr)
    setSelected(id)
  }

  if (isLoading) return <h1>Loading</h1>

  if (isError) return <h1>{error.message}</h1>

  return (
    <div className="flex gap-5">
      <div className="overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-thumb-r h-96 border-zinc-300 pr-5">
        <ul className="space-y-2 w-96">
          {
            arr.map((item: any) => (
              <li
                key={item.id}
                className={`flex items-center justify-between gap-2 hover:bg-white px-4 py-2 rounded-md cursor-pointer ${selected === item.id ? "bg-white" : ""}`}
                onMouseEnter={() => onHover(item.subcategories, item.id)}
              >
                <div className="flex items-center gap-2">
                  <img src={item.icon} alt={item.name} className="w-8 h-8 object-cover rounded-full" />
                  <p>{item.name}</p>
                </div>
                <DownIcon rotate="-rotate-90" />
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        {
          subCategories.map(i => (
            <p>{i.name}</p>
          ))
        }
      </div>
    </div>
  )
}

// interface ListItemProps {
//   icon?: React.ReactNode;
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   ListItemProps & React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, icon, ...props }, ref) => {
//   return (
//     <li >
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none flex items-center">{title}{icon}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
