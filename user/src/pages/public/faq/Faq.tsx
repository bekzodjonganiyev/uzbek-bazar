import { ReactElement } from 'react'

import sallerBgImage from "@/assets/images/sellers-bg.png"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// type Props = {}

export const Faq = (/*/props: Props*/): ReactElement => {

    const a = [1, 2, 3, 4, 5, 6]
    return (
        <div className='py-10'>
            <div
                style={{ backgroundImage: `url("${sallerBgImage}")` }}
                className='w-full h-96 bg-cover bg-no-repeat flex items-center justify-center'
            >
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-medium text-center'>Savol-javoblar</h1>
                    <p className='text-center'>At vero eos et accusamus et iusto odio dignissimos ducimus qui <br /> blanditiis voluptatum deleniti.</p>
                </div>
            </div>

            {/* -----FAQ----- */}
            <div className='md:w-[70%] mx-auto mt-10'>
                <h2 className='md:text-2xl text-sm font-medium'>Shopping</h2>
                <Accordion type="single" collapsible>
                    {
                        a.map((i: any) => (
                            <AccordionItem key={i} value={"item" + i}>
                                <AccordionTrigger>{"Title" + i}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2">
                                        {"Content" + i}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>

            {/* -----FAQ----- */}
            <div className='md:w-[70%] mx-auto mt-10'>
                <h2 className='md:text-2xl text-sm font-medium'>Payment</h2>
                <Accordion type="single" collapsible>
                    {
                        a.map((i: any) => (
                            <AccordionItem key={i} value={"item" + i}>
                                <AccordionTrigger>{"Title" + i}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-2">
                                        {"Content" + i}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>

        </div>
    )
}