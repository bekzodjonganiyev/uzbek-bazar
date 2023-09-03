import { ReactElement } from 'react'
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"

// interface Props {}

export const MobileMenuSheet = (/*props: Props*/):ReactElement  => {
  return (
    <aside>
        <SheetHeader>
            <SheetTitle className='text-2xl font-semibold'>Mobile Menu</SheetTitle>
        </SheetHeader>
    </aside>
  )
}