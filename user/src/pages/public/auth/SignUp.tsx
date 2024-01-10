import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { usePost } from "@/utils/api";
import { cn } from "@/lib/utils";
import { ToastAction } from "@/components/ui/toast";
import { AxiosError } from "axios";

// type Props = {}
type UserSignUp = {
  full_name: string;
  phone: string;
  password: string;
  active: number;
};

export const SignUp = (/*props: Props*/) => {
  const { toast } = useToast();
  const useRegister = usePost("post", onSuccessPost, onErrorPost);

  function onSuccessPost() {
    toast({
      description: "Hisob muvafaqqiyatli ochildi",
      variant: "success",
      action: (
        <ToastAction
          className="bg-white text-black text-xs font-bold"
          altText="Kirish"
          onClick={() => window.location.replace("/auth/login")}
        >
          Kirish
        </ToastAction>
      ),
    });
  }

  function onErrorPost(err: AxiosError){
    console.log(err)
    toast({
      description: (err.response?.data as { user: string }).user,
      variant: "destructive",
    });
  }

  const [user, setUser] = useState<UserSignUp>({
    full_name: "",
    phone: "",
    password: "",
    active: 1,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (user.phone.length === 17 && user.full_name && user.password) {
      useRegister.mutate({ url: "clients/", data: user });
    }
  };

  return (
    <div className="flex items-center justify-center py-10 h-full">
      <form
        className="bg-white p-5 border rounded-md shadow-xl w-[450px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Shaxsiy hisob yaratish</h1>
        <p className="leading-none">
          Enter your email below to create your account
        </p>

        <br />

        <Label htmlFor="full_name" className="font-bold">
          Ism Sharif
        </Label>
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

        <Label htmlFor="phone" className="font-bold">
          Telefon raqam
        </Label>
        <InputMask
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          mask="+\9\98 (99) 999-99-99"
          maskChar={null}
          value={user?.phone}
          onChange={(e) => {
            const a = e.target.value.split(" ").join("");
            setUser({ ...user, phone: a });
          }}
        />

        <br />

        <Label htmlFor="password" className="font-bold">
          Parol
        </Label>
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

        <Button
          type="submit"
          className={cn(
            "w-full",
            useRegister.isLoading && "cursor-not-allowed"
          )}
          disabled={useRegister.isLoading}
        >
          {useRegister.isLoading ? (
            <span className="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
          ) : (
            "Yuborish"
          )}
        </Button>

        <br />

        <div className="flex items-start mt-5 gap-2">
          <p>Sizda shaxshiy hisob bormi</p>
          <Link
            to={"/auth/login"}
            type="button"
            className="text-indigo-500 underline"
          >
            Hisobga kirish
          </Link>
        </div>
      </form>
    </div>
  );
};
