import { Fragment } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { CartIcon } from '@/assets/icons'

type IProductCartModal = {
    img: string,
    isCartItem: boolean
}

export function ProductCartModal(props: IProductCartModal) {
    const modalContent =
        (<div className="flex md:flex-row flex-col gap-4">
            {/* Image */}
            <div className="md:w-1/2 clg-r">
                <img className="object-cover object-right-top max-md:h-44 max-md:w-32" src={props.img} alt="" width={"100%"} />
            </div>

            {/* Paramtrs */}
            <div className="md:w-1/2">
                <div>
                    <p>Colors:</p>
                    {
                        [1, 2, 3].map((item: any) => <span className="space-x-2">{item}</span>)
                    }
                </div>
            </div>
        </div>)

    return (
        <Fragment>
            {/* Only desktop */}
            <div className="sm:block hidden">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size={"icon"} className="rounded-none border-none p-0">
                            <CartIcon
                                width={25}
                                height={25}
                                color={"#121212"}
                                type={props.isCartItem ? "in" : "add"}
                            />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Maxsulot nomi</DialogTitle>
                            <DialogDescription>
                                Savatga qo'shish uchun bazi parametrlarni tanlang
                            </DialogDescription>
                        </DialogHeader>
                        {modalContent}
                        <DialogFooter>
                            <Button type="submit">Savatga qo'shish</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Only mobile */}
            <div className="max-sm:block hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size={"icon"} className="rounded-none border-none p-0">
                            <CartIcon
                                width={25}
                                height={25}
                                color={"#fff"}
                                type={props.isCartItem ? "in" : "add"}
                            />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={"bottom"}>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                        {modalContent}
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </Fragment>

    )
}