import { Dispatch, SetStateAction, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "../ui/button";
import { useFetch } from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";
import { productColor } from "@/interfaces/product";

type Props = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  img: string;
  id: number;
};

export default function Modal({ active, setActive, img, id }: Props) {
  const cancelButtonRef = useRef(null);
  const [activeColor, setActiveColor] = useState<number>(0);
  const [size, setSize] = useState<{ size: string; id: number | undefined }>({
    size: "",
    id: undefined,
  });

  const productById = useFetch<AxiosResponse, AxiosError>(
    ["product-by-id-on-modal", id],
    `products/${id ?? ""}`
  );

  const getActiveColor = (index: number) => {
    try {
      const variables: productColor[] = productById.data?.data.variables;

      if (variables.length > 0 && variables.length >= index) {
        return variables[index];
      } else {
        return undefined;
      }
    } catch {
      return undefined;
    }
  };

  const onPostCart = () => {
    alert(
      `product:${id},product_variable:${getActiveColor(activeColor)?.id},size:${
        size.id
      }
        `
    );
  };

  return (
    <Transition.Root show={active} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setActive}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all flex flex-col md:flex-row md:w-[600px] md:h-[350px] sm:h-[500px] sm:w-full">
                  <div style={{ width: "50%" }} className="bg-white p-5">
                    <div className="sm:flex sm:items-start">
                      <div className="sm:ml-4 sm:mt-0 sm:text-left">
                        <LazyLoadImage
                          src={img}
                          alt={"name"}
                          height="100%"
                          width="100%"
                          className="h-full w-full object-cover"
                        />
                        <div>
                          <Dialog.Title>
                            {productById.data?.data.name}
                          </Dialog.Title>
                          <p className="flex gap-2 text-sm text-gray-600">
                            <span>{productById.data?.data.price}</span>
                            {productById.data?.data.discount > 0 && (
                              <span className="line-through">
                                {productById.data?.data.price}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }} className="bg-gray-50 p-5">
                    {/* color */}
                    <div>
                      <p className="mb-[5px]">Color:</p>
                      <div className="flex gap-2">
                        {productById.data?.data.variables.map(
                          (item: productColor, ind: number) => (
                            <div
                              className={`border-black rounded-full ${
                                getActiveColor(activeColor) === item
                                  ? "border-2"
                                  : ""
                              }`}
                            >
                              <button
                                style={{ backgroundColor: item.color }}
                                key={item.id}
                                className={`p-5 border-2 rounded-full`}
                                onClick={() => setActiveColor(ind)}
                              ></button>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* size  */}
                    <div>
                      <p className="my-[5px]">Size:</p>
                      <div className="space-x-3">
                        {productById.data?.data?.size
                          ? productById.data?.data?.size.map((item: any) => (
                              <button
                                key={item.id}
                                className={`rounded-md p-2 border-2 my-[3px] ${
                                  size.id === item.id ? "border-black" : ""
                                }`}
                                onClick={() =>
                                  setSize({ size: item, id: item.id })
                                }
                              >
                                {item.name}
                              </button>
                            ))
                          : null}
                      </div>
                    </div>

                    <Button
                      variant={"default"}
                      className="fixed bottom-[10px]"
                      onClick={onPostCart}
                    >
                      Savatga qo’shish
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
