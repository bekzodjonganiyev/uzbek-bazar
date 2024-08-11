import InputMask from "react-input-mask";
import { Navigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useFetch, usePost } from "@/utils/api"; 

// type Props = {}
export const UserProfileSettings = (/*props: Props*/) => {
  const { data, isLoading, error } = useFetch<AxiosResponse, AxiosError>(["user-profile-data"], "clients/profile/", true)
  const userMutation = usePost("post", (e) => onSuccess(e), (e) => onError(e))

  function onSuccess(e: AxiosResponse) {
    alert(e.statusText)
  }

  function onError(e: AxiosError) {
    alert(e.response?.statusText)
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")

    window.location.reload()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fm = new FormData(e.currentTarget)

    userMutation.mutate({url: "clients/profile/", data: fm })
  }

  if (isLoading) return <div className="w-100 h-100 flex items-center justify-center">Loading</div>

  if (error) return <Navigate to={"/login"} replace/>

  return (
    <div className="border-2 p-3 rounded-sm">
      <form className="row" onSubmit={handleSubmit}>
        <div className="flex max-md:flex-col justify-between gap-5">
          {/* Name */}
          <div className="md:w-1/3">
            <Label>Ism</Label>
            <Input
              defaultValue={data.data.full_name}
              name="first_name"
              type="text"
              placeholder="Ism"
              // defaultValue={user.data.data.first_name}
              required
            />
          </div>

          {/* Surname */}
          <div className="md:w-1/3">
            <Label>Familiya</Label>
            <Input
              defaultValue={data.data.full_name}
              name="last_name"
              type="text"
              placeholder="Familiya"
              // defaultValue={user.data.data.last_name}
              required
            />
          </div>

          {/* Phone */}
          <div className="md:w-1/3">
            <Label>Telefon</Label>
            <InputMask
              defaultValue={data.data.phone}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              )}
              mask="+\9\98 (99) 999-99-99"
              maskChar={null}
            />
          </div>
        </div>

        <hr className="my-10" />

        <div className="flex max-md:flex-col justify-between gap-5">
          {/* Region */}
          <div className="md:w-1/3">
            <Label>Viloyat</Label>
            <Select name="region">
              <SelectTrigger className="border">
                <SelectValue placeholder="Viloyatni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Viloyatlar</SelectLabel>
                  <SelectItem value="apple">Andijon</SelectItem>
                  <SelectItem value="banana">Samarqand</SelectItem>
                  <SelectItem value="blueberry">Buxoro</SelectItem>
                  <SelectItem value="grapes">Surxondaryo</SelectItem>
                  <SelectItem value="pineapple">Qashqadaryo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* District */}
          <div className="md:w-1/3">
            <Label>Tuman</Label>
            <Select name="district">
              <SelectTrigger className="border">
                <SelectValue placeholder="Tumanni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tumanlar</SelectLabel>
                  <SelectItem value="apple">Baliqchi</SelectItem>
                  <SelectItem value="banana">Xatirchi</SelectItem>
                  <SelectItem value="blueberry">Katta Qo'rg'on</SelectItem>
                  <SelectItem value="grapes">Kitob</SelectItem>
                  <SelectItem value="pineapple">Sherobod</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="md:w-1/3">
            <Label>Manzil</Label>
            <Input
              defaultValue={"Nomalum manzil"}
              name="address"
              type="text"
              placeholder="Manzil"
              // defaultValue={user.data.data.address}
              required
            />
          </div>
        </div>

        <hr className="my-10" />

        <div className="flex justify-between">
          <Button onClick={() => handleLogOut()} type="button" variant={"destructive"}>
            Chiqish
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            className="btn btn-success"
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};
