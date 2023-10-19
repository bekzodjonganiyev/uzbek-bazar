import { useState } from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

// type Props = {}
export const SignUp = (/*props: Props*/) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <div className="flex items-center justify-center py-10 h-full">
      <form className="bg-white p-5 border rounded-md shadow-xl w-[450px]" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Shaxsiy hisob yaratish</h1>
        <p className="leading-none">Enter your email below to create your account</p>

        <br />

        <Label htmlFor="full_name" className="font-bold">Ism Sharif</Label>
        <Input name="full_name" id="full_name" type="text" placeholder="Davlatov Davlat" className="" />

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
          <p>Sizda shaxshiy hisob bormi</p>
          <Link to={"/auth/login"} type="button" className="text-indigo-500 underline">Hisobga kirish</Link>
        </div>
      </form>
    </div>
  )
}