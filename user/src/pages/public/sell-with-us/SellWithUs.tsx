import { ReactElement, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PhoneIcon } from '@/assets/icons'
import { ProductReview as CustomerReview } from '@/components'

import sallerBgImage from "@/assets/images/sellers-bg.png"

// type Props = {}

export const SellWithUs = (/*props: Props*/): ReactElement => {
    const [searchTerm, setSearchTerm] = useState("")

    const a = [1, 2, 3, 4, 5]
    return (
        <div className='py-10'>
            <div
                style={{ backgroundImage: `url("${sallerBgImage}")` }}
                className='w-full h-96 bg-cover bg-no-repeat flex items-center justify-center'
            >
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-medium text-center'>Biz bilan soting</h1>
                    <p className='text-center'>At vero eos et accusamus et iusto odio dignissimos ducimus qui <br /> blanditiis voluptatum deleniti.</p>
                </div>
            </div>

            <div className='flex items-start justify-between gap-20 mt-10 max-md:flex-col'>
                {/* -----BENEFIT OF SELL WITH US----- */}

                {/* TODO - <div className='w-10/12' dangerouslySetInnerHTML={{ __html: "" }} /> */}

                <div className='md:w-8/12'>
                    <div className=' mb-10'>
                        <h2 className="text-2xl font-medium mb-5">Keep your everyday on trend</h2>

                        <p className='text-stone-400'>
                            Nayzak, everyone in my team works towards the samegoal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize. <br /> <br />
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
                        </p>

                        <h2 className="text-2xl font-medium mb-5">Keep your everyday on trend</h2>

                        <p className='text-stone-400'>
                            Nayzak, everyone in my team works towards the samegoal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize. <br /> <br />
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
                        </p>

                        <br /><br />

                        <div className='border'>
                            <img
                                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                                className='w-full h-full object-cover'
                                alt=""
                            />
                        </div>

                        <br /><br />

                        <h2 className="text-2xl font-medium mb-5">Keep your everyday on trend</h2>

                        <p className='text-stone-400'>
                            Nayzak, everyone in my team works towards the samegoal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize. <br /> <br />
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
                        </p>
                    </div>

                    <hr />

                    {/* -----CUSTOMER OPINION---- */}
                    <div className='mt-10'>
                        <h2 className='text-2xl font-medium'>Sotuvchilar fikri</h2>
                        {
                            a.map((i: any) => (
                                <CustomerReview
                                    key={i}
                                    date={new Date().toTimeString()}
                                    desc='At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident, sunt in culpa qui officia animi, id est laborum et dolorum fuga.'
                                    img='https://api-qabul.tkti.uz/uploads/file-1693294629138.jpg'
                                    name='Desirae Franci'
                                />
                            ))
                        }
                    </div>

                </div>


                {/* -----CONNTACT FORM----- */}
                <div className='md:w-4/12 rounded-lg bg-[#FFEAD8] p-6'>
                    <h3 className='text-xl font-medium pb-3 border-b-2 border-black mb-5'>Savollaringiz bormi?</h3>

                    <p>
                        Agar qo’shimcha savollaringiz bo’lsa, bizning ishonch telefon raqam <b>+998(90)123-45-67</b> orqali yo’llang, biz qo’ng’iroqlarni 8:00 dan kech 22:00 ga qadar qabul qilamiz, xizmat qiymati - bepul! <br /><br />

                        Bizning Telegram bot manzilimiz <b>@Uzbekbazar_Support_Bot</b> ga yozing, biz murojaatlarni 24/7 qabul qilamiz! <br /><br />

                        <b>Quyidagi forma orqali qo’ng’iroqqa buyurtma berishingiz mumkin.</b>
                    </p>

                    <div className="relative max-md:w-full my-5">
                        {/* TODO - icon bosilganda search qilishi kerak */}
                        <PhoneIcon className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input className='w-full px-10' placeholder='+998 (__) ___-__-__' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <Button className='w-full'>Yuborish</Button>
                </div>
            </div>

            {/* -----FAQ---- */}
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