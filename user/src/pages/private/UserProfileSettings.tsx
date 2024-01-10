import InputMask from "react-input-mask";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// type Props = {}
export const UserProfileSettings = (/*props: Props*/) => {
  return (
    <div className="border-2 p-3 rounded-sm">
      <form className="row" onSubmit={() => {}}>
        <div className="flex max-md:flex-col justify-between gap-5">
          {/* Name */}
          <div className="md:w-1/3">
            <Label>Ism</Label>
            <Input
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
            <Select>
              <SelectTrigger className="border">
                <SelectValue placeholder="Viloyatni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* District */}
          <div className="md:w-1/3">
            <Label>Tuman</Label>
            <Select>
              <SelectTrigger className="border">
                <SelectValue placeholder="Tumanni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="md:w-1/3">
            <Label>Manzil</Label>
            <Input
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
          <Button type="button" variant={"destructive"}>
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
