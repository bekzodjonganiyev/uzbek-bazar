import { ReactElement } from "react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface Props {
    items: {title:string, value:string, content:string[]}[],
}

export const CustomAccardion = ({ items }: Props): ReactElement => {
    return (
        <Accordion type="single" collapsible>
            {
                items.map((item, idx) => (
                    <AccordionItem key={idx} value={item.value}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                            {
                                item.content.map((link, idx) => (
                                    <a key={idx} href={link}>{link}</a>
                                ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                ))
            }

        </Accordion>

    )
}