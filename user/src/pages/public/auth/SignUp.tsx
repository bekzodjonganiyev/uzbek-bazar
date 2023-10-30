import React, { useState } from "react"
import { Link } from "react-router-dom"
import InputMask from 'react-input-mask';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { usePost } from "@/utils/api"

// type Props = {}
type User = {
  full_name: string,
  phone: string,
  password: string
  active: number
}

export const SignUp = (/*props: Props*/) => {
  const useRegister = usePost("post")

  const [user, setUser] = useState<User>({
    full_name: "",
    phone: "",
    password: "",
    active: 1
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()


    if (user.phone.length === 17 && user.full_name && user.password) {
      useRegister
        .mutateAsync({ url: "clients/", data: user })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="flex items-center justify-center py-10 h-full">
      <form className="bg-white p-5 border rounded-md shadow-xl w-[450px]" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Shaxsiy hisob yaratish</h1>
        <p className="leading-none">Enter your email below to create your account</p>

        <br />

        <Label htmlFor="full_name" className="font-bold">Ism Sharif</Label>
        <Input
          name="full_name"
          id="full_name"
          type="text"
          placeholder="Davlatov Davlat"
          className=""
          value={user?.full_name}
          onChange={(e) => setUser({ ...user, full_name: e.target.value })}
        />

        <br />

        <Label htmlFor="phone" className="font-bold">Telefon raqam</Label>
        {/* <MaskInput
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          mask={'+998 (00) 000 - 00 - 00'}
          alwaysShowMask
          showMask
          maskChar="_"
          value={user?.phone}
          onValueChange={(e) => {
            const a = e.value.split(" ").join("")
            setUser({ ...user, phone: a })
          }}
        /> */}
        <InputMask
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          mask="+\9\98 (99) 999-99-99"
          maskChar={null}
          value={user?.phone}
          onChange={(e) => {
            const a = e.target.value.split(" ").join("")
            setUser({ ...user, phone: a })
          }}
        />

        <br />

        <Label htmlFor="password" className="font-bold">Parol</Label>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Parol"
          className=""
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

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