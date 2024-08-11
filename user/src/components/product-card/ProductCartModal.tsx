import { Fragment, useMemo, useState } from "react"
// import { redirect } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { AxiosError, AxiosResponse } from "axios"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ToastAction } from "@/components/ui/toast"

// import { useAppDispatch } from "@/redux"
import { productVariable, productSize } from "@/interfaces/product"
import { CartIcon } from '@/assets/icons'
import { useFetch, usePost } from "@/utils/api"
import { useWindowSize } from "@/utils/Hooks"
import { getMachineId } from "@/utils/getSeesionId"
import { cn } from "@/lib/utils"
// import { setCartId } from "@/redux/actions/cart-action"
import { useToast } from "@/components/ui/use-toast"

type IProductCartModal = {
    img: string,
    isCartItem: boolean,
    id: number
}

export function ProductCartModal(props: IProductCartModal) {
    const productById = useFetch<AxiosResponse, AxiosError>(["product-cart-modal", props.id], `products/${props.id ?? ""}`, false, false);
    const productCartMutation = usePost("post", onSuccessCartPost, () => {}, true)
    const { width } = useWindowSize();
    const { isError } = getMachineId()
    // const dispatch = useAppDispatch()
    const { toast } = useToast()

    const [open, setOpen] = useState<boolean>(false)
    const [productVariables, setProductVariables] = useState<productVariable>();
    const [size, setSize] = useState<productSize>();
    const [validateErrMsg, setValidateErrMsg] = useState<{ color: string, size: string }>();

    const onPostCart = () => {
        if (!props.isCartItem) {
            const obj = {
                url: "carts/",
                data: {
                    quantity: 1,
                    product: props.id,
                    // session_id: isError ? machineId : userData?.data.id, // TODO - login qilinganda user_id ketadi
                    // user: userData?.data.id,
                    product_variable: productVariables?.id,
                    size: size?.id
                }
            }

            if (size && productVariables) {
                productCartMutation.mutate(obj)
            } else {
                setValidateErrMsg({ color: "Rang tanlang", size: "O'lcham tanlang" })
            }

        } else {
            toast({
                description: "Maxsulot allaqachon savatda",
                variant: "success",
                action: <ToastAction
                    className="bg-white text-black text-xs font-bold"
                    altText="Tushunarli"
                    onClick={() => setOpen(false)}
                >
                    Tushunarli
                </ToastAction>,
            })
        }
    };

    useMemo(() => {
        setValidateErrMsg({ color: "", size: "" })
    }, [size, productVariables])

    function onSuccessCartPost() {
        // const { data } = e
        // dispatch(setCartId(props.id, data.id, ""))

        setTimeout(() => {
            setOpen(false)
        }, 300)

        setTimeout(() => {
            toast({
                description: "Maxsulot savatga qo'shildi",
                variant: "success",
                action: <ToastAction
                    className="bg-white text-black text-xs font-bold"
                    altText="Try again"
                    onClick={() => window.location.replace("/cart")}
                >
                    Savatga o'tish
                </ToastAction>,
            })
        }, 400)
    }


    const modalContent =
        <div className="flex max-md:flex-col gap-1 max-md:py-4">
            <div className="md:w-1/2 max-lg:h-64 max-md:h-72 max-sm:h-80 h-auto pr-3">
                <LazyLoadImage
                    src={props.img}
                    alt={"name"}
                    height="100%"
                    width="100%"
                    effect="opacity"
                    className="h-full w-full object-cover max-md:object-top"
                />
            </div>
            <div className="md:w-1/2">
                {/* color */}
                <div>
                    <p className="mb-[5px]">Color:</p>
                    <div className="flex flex-wrap gap-1 product-color">
                        {productById.data?.data.variables.map(
                            (item: productVariable, ind: number) => (
                                <Fragment key={ind}>
                                    <input
                                        type="radio"
                                        name="color"
                                        id={`productVariable${ind}`}
                                        onChange={() => setProductVariables(item)}
                                        className="hidden"
                                    />
                                    <label htmlFor={`productVariable${ind}`} className="w-8 h-8 rounded-full border-2 border-gray-200 mr-1 flex items-center justify-center group-hover:hidden">
                                        <i className="w-6 h-6 rounded-full block" style={{ backgroundColor: item.color }} />
                                    </label>
                                </Fragment>
                            )
                        )}
                    </div>
                    <p className={cn("text-red-600", validateErrMsg ? "block" : "hidden")}>{validateErrMsg?.color}</p>
                </div>

                <br />

                {/* size  */}
                <div>
                    <p className="my-[5px]">Size:</p>
                    <div className="flex gap-1 flex-wrap">
                        {productById.data?.data?.size
                            ? productById.data?.data?.size.map((item: productSize, ind: number) => (
                                <Fragment key={ind}>
                                    <input
                                        type="radio"
                                        name="size"
                                        id={`productSize${ind}`}
                                        onChange={() => setSize({ ...item })}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={`productSize${ind}`}
                                        className="w-[35px] h-[35px] border-2 overflow-hidden border-gray-400 mr-1 flex items-center justify-center group-hover:hidden cursor-pointer"
                                    >
                                        {item.name}
                                    </label>
                                </Fragment>
                            ))
                            : null}
                    </div>
                    <p className={cn("text-red-600", validateErrMsg ? "block" : "hidden")}>{validateErrMsg?.size}</p>

                </div>
            </div>
        </div>

    if (width <= 640) return (
        <div className="max-sm:block hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size={"icon"} onClick={() => productById.refetch()} className="rounded-none border-none p-0">
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
                    <SheetFooter className="mt-5">
                        <Button
                            onClick={() => {
                                isError ? window.location.href = "/auth/login" : onPostCart()
                            }}
                            type="submit">Save changes</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
    else return (
        <div className="sm:block hidden">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size={"icon"} onClick={() => productById.refetch()} className="rounded-none border-none p-0">
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
                    <DialogFooter className="mt-5">
                        <Button
                            onClick={() => {
                                isError ? window.location.href = "/auth/login" : onPostCart()
                            }}
                            type="submit" disabled={productCartMutation.isLoading}>Savatga qo'shish</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}