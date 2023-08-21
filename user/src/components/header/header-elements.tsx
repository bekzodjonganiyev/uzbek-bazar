import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

import { categories } from "@/utils/mocks"


export const Menu = () => {
  return (
    <NavigationMenu className="md:block hidden">
      <NavigationMenuList>
        {
          categories.map((item1, idx) => (
            <React.Fragment key={idx}>
              {
                 <NavigationMenuItem>
                      <NavigationMenuTrigger>{item1.title1}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="p-4 w-96">
                            {
                              item1.items1.map(item2 => (
                                !item2.submenu2
                                  ? <ListItem
                                      className=""
                                      key={item2.title2}
                                      title={item2.title2}
                                      href={item2.title2}
                                    />
                                  : <>
                                        {
                                          <ListItem
                                            icon={<ChevronRight className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />}
                                            key={item2.title2}
                                            title={item2.title2}
                                            href={item2.title2}
                                          />
                                        }
                                    </>
                              ))
                            }
                          </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
              }
            </React.Fragment>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  ListItemProps & React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li >
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">{title}{icon}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
