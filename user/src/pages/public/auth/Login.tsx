import { useState } from "react";
import { Link } from "react-router-dom"
import InputMask from 'react-input-mask';
import axios from "axios";


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils";
import { API_URL } from "@/utils/api";

type UserSignIn = {
  username: string,
  password: string
}

// type Props = {}
export const Login = (/*props: Props*/) => {
  const { toast } = useToast()

  const [user, setUser] = useState<UserSignIn>({ username: "", password: "" })
  const [error, setError] = useState<UserSignIn>({ username: "", password: "" })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (user.username.length === 17 && user.password) {
      setError({
        username: "",
        password: ""
      })

      try {
        const baseUrl = API_URL.split("web")[0]
        console.log(baseUrl)
        const res = await axios.post(`${baseUrl}auth/`, user)

        if (res.status === 201) {
          localStorage.setItem("token", res.data?.token)

          toast({
            description: "Profilingizga kirdingiz",
            variant: "success"
          })

          setTimeout(() => {
            window.location.replace("/user-profile")
          }, 200);
        }

      } catch (error) {
        toast({
          description: "Login yoki parol xato",
          variant: "danger"
        })
      }

    }
    else {
      setError({
        username: "border border-red-400 focus-visible:ring-red-400",
        password: "border border-red-400 focus-visible:ring-red-400"
      })
    }

  }

  return (
    <div className="flex items-center justify-center py-10 h-full">
      <form className="bg-white p-5 border rounded-md shadow-xl w-[450px]" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Shaxsiy kabinetga kirish</h1>
        <p className="leading-none">Enter your email below to create your account</p>

        <br />

        <Label htmlFor="phone" className="font-bold">Telefon raqam</Label>
        <InputMask
          className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", error.username ? error.username : "oka")}
          mask="+\9\98 (99) 999-99-99"
          maskChar={null}
          onChange={(e) => {
            const a = e.target.value.split(" ").join("")
            setUser(prev => ({ ...prev, username: a }))
          }}
        />

        {/* ENTER */}
        <br />
        {/* ENTER */}

        <Label htmlFor="password" className="font-bold">Parol</Label>
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Parol"
          className={cn(error.password ? error.password : "oka")}
          onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
        />

        {/* ENTER */}
        <br />
        {/* ENTER */}

        <Button type="submit" className="w-full">Yuborish</Button>

        {/* ENTER */}
        <br />
        {/* ENTER */}

        <div className="flex items-start mt-5 gap-2">
          <p>Sizda shaxsiy hisob yo'qmi?</p>
          <Link to={"/auth/signup"} type="button" className="text-indigo-500 underline">Ro'yxatdan o'tish</Link>
        </div>
      </form>
    </div>
  )
}