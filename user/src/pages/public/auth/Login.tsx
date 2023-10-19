import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

// type Props = {}
export const Login = (/*props: Props*/) => {
  const [isLogin, setIsLogin] = useState(true)

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
        <Input name="phone" id="phone" type="number" placeholder="+998 (99) 111-22-33" className="" />

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