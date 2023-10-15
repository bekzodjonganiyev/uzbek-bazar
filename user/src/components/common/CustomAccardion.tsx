import { ReactElement } from "react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "react-router-dom"

interface Props {
    items: { title: string, value: string, content: {link: string, title: string}[] }[],
    className: string
}

export const CustomAccardion = ({ items, className }: Props): ReactElement => {
    return (
        <Accordion type="multiple" className={className}>
            {
                items.map((item, idx) => (
                    <AccordionItem key={idx} value={item.value} className="border-">
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                {
                                    item.content.map((item, idx) => (
                                        <Link key={idx} to={item.link}>{item.title}</Link>
                                    ))
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))
            }

        </Accordion>

    )
}