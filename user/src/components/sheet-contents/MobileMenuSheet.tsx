import { ReactElement } from 'react'
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"

// interface Props {}

export const MobileMenuSheet = (/*props: Props*/):ReactElement  => {
  return (
    <aside className='z-[9999]'>
        <SheetHeader>
            <SheetTitle className='text-2xl font-semibold'>Katalog</SheetTitle>
        </SheetHeader>
    </aside>
  )
}