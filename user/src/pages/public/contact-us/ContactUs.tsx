import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { NextItemIcon } from '@/assets/icons'

import sallerBgImage from "@/assets/images/sellers-bg.png"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// type Props = {}

export const ContactUs = (/*/props: Props*/): ReactElement => {

    const a = [1, 2, 3, 4, 5, 6]
    return (
        <div className='py-10'>
            <div
                style={{ backgroundImage: `url("${sallerBgImage}")` }}
                className='w-full h-96 bg-cover bg-no-repeat flex items-center justify-center'
            >
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-medium text-center'>Biz bilan bog'lanish</h1>
                    <p className='text-center'>At vero eos et accusamus et iusto odio dignissimos ducimus qui <br /> blanditiis voluptatum deleniti.</p>
                </div>
            </div>

            {/* -----FORM AND MAP----- */}
            <div className='flex max-md:flex-col-reverse gap-10 w-[90%] mx-auto py-10'>
                <form className='space-y-8 md:w-1/2'>
                    <div>
                        <Label id='full_name'>Full name</Label>
                        <Input className='w-full' placeholder='Full name' id='full_name' />
                    </div>

                    <div>
                        <Label id='full_name'>Email address</Label>
                        <Input className='w-full' placeholder='Email address' id='full_name' />
                    </div>

                    <div>
                        <Label id='message'>Message</Label>
                        <Textarea className='w-full h-44' placeholder='Message' id='message' />
                    </div>

                    <Button type='submit'>Send message</Button>
                </form>

                <div className='md:w-1/2 rounded-lg'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2996.390964467504!2d69.2463333!3d41.3221111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzE5LjYiTiA2OcKwMTQnNDYuOCJF!5e0!3m2!1sru!2s!4v1694004576632!5m2!1sru!2s"
                        style={{ border: 0 }}
                        className='w-full h-full rounded-lg max-md:h-96'
                    >
                    </iframe>
                </div>
            </div>

            {/* -----BRANCHES----- */}
            <div className='py-10 bg-card-bg'>
                <div className='flex md:flex-row flex-col items-start max-md:gap-y-10 gap-10 w-[90%] mx-auto'>
                    <div className='md:w-1/2 w-full'>
                        <h2 className='font-medium text-3xl text-textColor-black pb-3'>Bizning filiallar</h2>
                        <p className='text-textColor-primary pb-3'>At vero et accusamus et iusto odio dignissimos ducimus qui <br /> blanditiis deleniti atqu.</p>
                        <Link to={"#"} className=" border-b border-black font-medium pb-1 inline-block">
                            <div className='flex items-end gap-2'><span>Barchasini ko'rish</span><NextItemIcon height={20} width={20} /></div>
                        </Link>
                    </div>
                    <div className='md:w-1/2 w-full grid min-[850px]:grid-cols-2 grid-cols-1 gap-5 min-w-44'>
                        {
                            a.map((i: any) => (
                                <div key={i} className='w-52'>
                                    <p className='font-medium'>Netherlands</p>
                                    <p className='text-textColor-primary'>Suite 101 Nayzak Street London REU UK</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* -----FAQ----- */}
            <div className='md:w-[50%] mx-auto mt-10'>
                <h2 className='text-2xl font-medium'>Ko’p beriladigan savollar</h2>
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