import { Dispatch, SetStateAction, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AxiosError, AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";

import { productColor } from "@/interfaces/product";
import { useFetch, usePost } from "@/utils/api";
import { setCartId, deleteCartId } from "@/redux/actions/cart-action";
import { useAppDispatch } from "@/redux";
import { getMachineId } from "@/utils/getSeesionId";

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

  console.log(productById.data?.data);

  const cartMutation = usePost("post");

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

    const obj = {
      product: id,
      product_variable: getActiveColor(activeColor)?.id,
      size: size.id,
      quantity: 1,
      session_id: getMachineId(),
    };

    cartMutation.mutate({ url: "carts/", data: obj }, {});
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

        <div className="fixed inset-0 z-10 w-screen">
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
                <div className="relative transform overflow-auto rounded-lg  text-left transition-all flex flex-col gap-2 md:flex-row md:w-[600px] md:h-[350px] sm:h-[500px] sm:w-full clg-r">
                  <div className=" p-5 md:w-1/2 clg-g h-full">
                    <div className="">
                      {/* <LazyLoadImage
                          src={img}
                          alt={"name"}
                          height="100%"
                          width="100%"
                          className="md:h-96 md:w-96 sm:h-72 sm:w-72 w-56 h-56 object-cover"
                        /> */}
                      <div>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eius assumenda officiis commodi officia
                        dignissimos voluptas ipsum, dolor a obcaecati. Ratione
                        sed quasi facilis molestiae, voluptatem rem dignissimos
                        harum, dolores eum atque autem eaque minima dicta
                        maiores. Eaque eveniet, sed voluptatibus dolor corporis
                        placeat doloribus quod. Totam autem dolores qui itaque
                        omnis dolore ea, tenetur distinctio excepturi unde nisi
                        mollitia, porro a, eaque at laborum fugiat fugit.
                        Exercitationem porro autem quaerat, sint minima fugiat
                        possimus, inventore ea architecto tempora, dolor a. Aut
                        ab maiores repellat provident aliquid suscipit, id,
                        fugit cum veniam sit dicta voluptatibus ratione nulla at
                        doloremque tenetur tempore magni temporibus esse nostrum
                        facere mollitia laudantium. Dolore magni, iusto maiores
                        nam ipsam dolorem deleniti sint eum illum vero
                        distinctio fugiat, nobis perferendis quam quis dolor
                        expedita debitis quasi qui quibusdam corrupti enim!
                        Adipisci quisquam debitis deserunt odit tempora
                        nesciunt. Rem minima consectetur iure placeat? Et
                        facilis maiores vitae exercitationem eaque officia
                        mollitia rerum quibusdam nostrum quo, natus esse
                        delectus nisi reiciendis, repudiandae voluptate!
                        Possimus quidem, veniam, recusandae odio eligendi dolor
                        quas ad autem accusamus aliquid, eum cum dolorum. Sint
                        magnam odio recusandae voluptas, ducimus reiciendis quae
                        maiores iure tempora amet expedita molestias? Facilis
                        non laudantium veniam assumenda ipsum quos ullam. Quis
                        id aliquid incidunt eveniet amet unde praesentium cumque
                        assumenda dicta quasi totam saepe exercitationem alias
                        veritatis, natus, aliquam debitis sint excepturi atque
                        consequuntur quibusdam et ab! Consequatur ducimus
                        distinctio at rerum dolores mollitia voluptatem nihil
                        laborum modi? Ipsa magnam corrupti, iste tempora esse
                        nihil vitae nam fugiat maxime minus. Laboriosam non
                        molestias excepturi ab veniam, ducimus nisi. Nemo fugit
                        quaerat veniam, consectetur tempora, sapiente sequi
                        officiis, eos officia temporibus velit quidem adipisci
                        ab placeat a facere voluptates dolores beatae ut. Odit
                        unde illum perspiciatis, doloribus quis porro adipisci
                        laborum consequuntur laboriosam esse iusto. Nihil, id
                        pariatur quasi recusandae temporibus facere. Aut earum
                        dignissimos aperiam. Architecto dolorum nesciunt,
                        repellendus, ipsam, consequuntur iusto eligendi vitae
                        tempora quam aspernatur facere molestiae beatae delectus
                        nisi repudiandae aliquid. Fugit saepe quisquam ipsam,
                        quo nulla officia alias soluta consequatur? Ullam
                        tempore dignissimos ex illum natus consequuntur unde,
                        dolore modi corrupti blanditiis quam omnis
                        necessitatibus sequi deserunt officiis cum minus, eos
                        minima excepturi mollitia explicabo quasi nostrum. At,
                        nihil dolor, tempora magnam suscipit dolorum quam
                        reprehenderit ullam nam asperiores excepturi? Sed nam
                        molestiae, nostrum, excepturi reiciendis ut cumque,
                        laudantium dolorum cupiditate iure maiores amet ipsam
                        laborum perspiciatis cum at. Temporibus earum atque quo
                        dolore molestiae beatae, nostrum quibusdam numquam
                        laborum odio in laudantium repudiandae sunt aliquam
                        consectetur reprehenderit quisquam at fuga vitae
                        aliquid. Nisi ipsam porro, quis at voluptates magni ex
                        cum maiores quos omnis neque optio molestias natus sequi
                        qui quae facere ipsum! Aut eveniet magnam molestias
                        impedit nihil modi laboriosam, exercitationem aliquam
                        beatae quibusdam porro deserunt autem culpa ea libero
                        voluptas, vero perferendis explicabo! Minima tenetur
                        ratione sed molestias reprehenderit sapiente quia
                        molestiae debitis iste architecto accusantium illum
                        accusamus cum unde, ab porro. Cupiditate aut accusantium
                        excepturi, perspiciatis illo voluptatum! Sed eaque
                        dolore qui amet sequi accusantium quo facere! A sapiente
                        ea nostrum?
                      </div>
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
                  <div className="bg-gray-50 p-5 md:w-1/2 clg-b">
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
                      className="mt-4 max-md:w-full"
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
