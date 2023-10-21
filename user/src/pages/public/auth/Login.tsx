import { Link } from "react-router-dom"
import MaskInput from 'react-maskinput';


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// type Props = {}
export const Login = (/*props: Props*/) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <div className="flex items-center justify-center py-10 h-full">
      <form className="bg-white p-5 border rounded-md shadow-xl w-[450px]" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Shaxsiy kabinetga kirish</h1>
        <p className="leading-none">Enter your email below to create your account</p>

        <br />

        <Label htmlFor="phone" className="font-bold">Telefon raqam</Label>
        <MaskInput
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          alwaysShowMask
          mask={'+998 (00) 000 - 00 - 00'}
          showMask
          maskChar="_"
        />
        
        <br />

        <Label htmlFor="password" className="font-bold">Parol</Label>
        <Input name="password" id="password" type="password" placeholder="Parol" className="" />

        <br />

        <Button type="submit" className="w-full">Yuborish</Button>

        <br />

        <div className="flex items-start mt-5 gap-2">
          <p>Sizda shaxsiy hisob yo'qmi?</p>
          <Link to={"/auth/signup"} type="button" className="text-indigo-500 underline">Ro'yxatdan o'tish</Link>
        </div>
      </form>
    </div>
  )
}