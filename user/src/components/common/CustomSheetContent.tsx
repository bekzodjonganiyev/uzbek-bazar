import { ReactElement, ReactNode } from 'react'
import { SheetContent } from "@/components/ui/sheet"

interface Props {
    side: "top" | "bottom" | "left" | "right" | null | undefined
    children: ReactNode
}

export const CustomSheetContent = (props: Props): ReactElement => {
    return (
        <SheetContent side={props.side}>
            {props.children}
        </SheetContent>
    )
}
