import { ReactNode } from "react"

import { SHEET_CONTENT } from "@/redux/contants"

export const setSheetContent = (side: "top" | "bottom" | "left" | "right" | null | undefined, children: ReactNode) => {
    return {
        type: SHEET_CONTENT.SET,
        payload: { side, children }
    }
}