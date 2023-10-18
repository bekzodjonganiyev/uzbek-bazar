import { ReactElement } from 'react'
import { useNavigate } from "react-router-dom"


import { Button } from "@/components/ui/button"
import { NotFoundIcon } from "@/assets/icons"

// type Props = {}

export const FourZeroFour = (/*props: Props*/): ReactElement => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full flex items-center justify-center py-10'>
            <div className='flex flex-col gap-2 items-center justify-center text-center'>
                <NotFoundIcon />
                <h1 className='text-3xl font-semibold'>404 – Sahifa topilmadi</h1>
                <p>Siz qidirayotgan sahifa mavjud emas. Qaytadan qidirib ko‘ring <br /> yoki quyidagi “Orqaga qaytish” tugmasini bosing.</p>
                <Button variant={'default'} size={'lg'} className='bg-black' onClick={() => navigate("/")}>Bosh sahifaga qaytish</Button>
            </div>
        </div>
    )
}