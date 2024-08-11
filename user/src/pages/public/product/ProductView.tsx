import { ReactElement, useState, Fragment, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { EyeIcon, HumanIcon, LikeIcon, QuestionIcon, ShareIcon } from "@/assets/icons";
import { CustomSuspanse } from "@/components/common";
import { ProductCarusel, ProductsListCarusel, ProductReview } from "@/components";

import { RootState, useAppDispatch } from "@/redux"
import { setWishlistId, deleteWishlistId } from "@/redux/actions/wishlist-action"
import { useFetch, usePost } from "@/utils/api";
import { cn } from "@/lib/utils";
import { productVariable, productMedia, productSize } from "@/interfaces/product";
import { review } from "@/interfaces/review";
import { question } from "@/interfaces/question";
import { getMachineId } from "@/utils/getSeesionId";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const ProductView = (/*props: Props*/): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart)
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const dispatch = useAppDispatch()

  const { isError, } = getMachineId()

  const productById = useFetch<AxiosResponse, AxiosError>(["product-by-id", id], `products/${id ?? ""}`, false);
  const sameProducts = useFetch<AxiosResponse, AxiosError>(["same-products", id], `products/?type=${productById.data?.data.type}&season=${productById.data?.data.season}`, false, productById.isSuccess);
  const seller = useFetch<AxiosResponse, AxiosError>(["seller", productById.data?.data.organization], `/organizations/?id=${productById.data?.data.organization}`, false, productById.isFetched);
  const questions = useFetch<AxiosResponse, AxiosError>(["ions"], "questions/", false);
  const reviews = useFetch<AxiosResponse, AxiosError>(["product_reviews"], "reviews/", false);

  const cartMutationPost = usePost("post", onSuccessCartPost, () => { }, true)

  const [defaultImgs] = useState<productMedia[]>([]);
  const [activeColor, setActiveColor] = useState<number>(0);
  const [sellerData, setSellerData] = useState<any>(null);
  const [tabs, setTabs] = useState<{ data: ReactElement; id: number | undefined; }>
    ({ data: <div>{productById.data?.data.gender}</div>, id: 1 });
  const [validateErrMsg, setValidateErrMsg] = useState<{ color: string, size: string }>();
  const [size, setSize] = useState<productSize>();
  const [productVariables, setProductVariables] = useState<productVariable>();

  const productIdsForCart = cart?.ids.map((i) => i.id)
  const isCart = productIdsForCart.includes(productById.data?.data.id)
  const isWishlist = wishlist.find(item => item.id === productById.data?.data.id)

  // ADD TO WISHLIST
  const addToWishlist = () => {
    if (!isWishlist) {
      dispatch(setWishlistId(productById.data?.data))

    } else {
      dispatch(deleteWishlistId(productById.data?.data))
    }
  }

  // ADD TO CART
  const addToCart = () => {
    if (!isCart) {
      const obj = {
        url: "carts/",
        data: {
          // session_id: isError ? machineId : userData?.data.id, // TODO - login qilinganda null ketadi
          // user: userData?.data.id,
          quantity: 1,
          product: productById.data?.data.id,
          product_variable: productVariables?.id,
          size: size?.id
        }
      }

      if (size && productVariables) {
        cartMutationPost.mutate(obj)
      } else {
        setValidateErrMsg({ color: "Rang tanlang", size: "O'lcham tanlang" })
      }

    } else {
      navigate("/cart")
    }
  }

  function onSuccessCartPost() {
    // dispatch(setCartId(productById.data?.data.id, res.data.id, ""))

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

  const getActiveMedia = (): any[] => {
    try {
      const variables: productVariable[] = productById.data?.data.variables;
      const currentColorMedias = variables.find((item: productVariable) => item.id === activeColor)
      if (currentColorMedias) {
        const matchedMedia = currentColorMedias.media.map((e: productMedia) => {
          return e.file;
        });
        return matchedMedia;
      } else {
        return defaultImgs.map((item: productMedia) => item.file);
      }
    } catch {
      return [];
    }
  };

  // GET SELLER DATA
  useEffect(() => {
    const sellerData = seller.isFetched && seller.data?.data?.results.filter((item: any) => item.id === productById.data?.data.organization)
    setSellerData(sellerData?.[0])
  }, [seller.isFetched])

  // GET DEFAULT IMAGES
  useEffect(() => {
    if (productById.isFetched) {
      productById.data?.data.variables?.forEach((element: productVariable) => {
        element.media.forEach((item: productMedia) => defaultImgs.push(item))
      });
    } else {
      defaultImgs.length = 0
    }
  }, [productById.isFetched, id])

  // Size and color change trigger
  useEffect(() => {
    setValidateErrMsg({ color: "", size: "" })
  }, [size, productVariables])

  return (
    <div className="flex flex-col gap-16 py-10 w-[90%] mx-auto">
      {/* begin:PRODUCT STARTER INFO */}
      <CustomSuspanse
        loading={productById.isLoading}
        error={productById.isError}
        loadingFallback={"Loading"}
        errorFallback={"Error"}
      >
        <div className="flex max-md:flex-col gap-10 justify-between items-start">
          {/* Product images carusel */}
          <ProductCarusel images={getActiveMedia()} />

          {/* Product starter infos */}
          <div className="flex flex-col gap-5 md:w-1/2 w-full">
            {/* Name */}
            <h1 className="text-2xl font-bold line-clamp-1">
              {productById.data?.data.name}
            </h1>

            {/* Description */}
            <p className="line-camp-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
              {productById.data?.data.desc}
            </p>

            {/* Rating */}
            <Rating
              initialValue={productById.data?.data.rating ?? 2}
              size={20}
              readonly
            />

            {/* Price */}
            <p className="flex gap-2">
              <span>{productById.data?.data.price}$</span>
              {productById.data?.data.discount > 0 && (
                <span className="line-through">
                  {productById.data?.data.price}$
                </span>
              )}
            </p>

            {/* Head count */}
            <div className="flex items-center gap-2">
              <span>
                <EyeIcon />
              </span>
              <p>
                {productById.data?.data.view_count} people are looking at this
                product
              </p>
            </div>

            <hr />

            <div className="md:w-1/2">
              {/* Color */}
              <div>
                <p className="mb-[5px]">Color:</p>
                <div className="flex flex-wrap gap-1 product-color">
                  {productById.data?.data.variables.map(
                    (item: productVariable, ind: number) => (
                      <Fragment key={ind}>
                        <input
                          type="radio"
                          name="color"
                          id={`productSingleColor${ind}`}
                          onChange={() => { setActiveColor(item.id); setProductVariables(item) }}
                          className="hidden"
                        />
                        <label htmlFor={`productSingleColor${ind}`} className="w-8 h-8 rounded-full border-2 border-gray-200 mr-1 flex items-center justify-center group-hover:hidden">
                          <i className="w-6 h-6 rounded-full block" style={{ backgroundColor: item.color }} />
                        </label>
                      </Fragment>
                    )
                  )}
                </div>
                <p className={cn("text-red-600", validateErrMsg ? "block" : "hidden")}>{validateErrMsg?.color}</p>
              </div>

              <br />

              {/* Size  */}
              <div>
                <p className="my-[5px]">Size:</p>
                <div className="flex gap-1 flex-wrap">
                  {productById.data?.data?.size
                    ? productById.data?.data?.size.map((item: productSize, ind: number) => (
                      <Fragment key={ind}>
                        <input
                          type="radio"
                          name="size"
                          id={`productSingleSize${ind}`}
                          onChange={() => setSize({ ...item })}
                          className="hidden"
                        />
                        <label
                          htmlFor={`productSingleSize${ind}`}
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

            {/* Add to cart */}
            <Button
              variant={"default"}
              className={cn("rounded-none py-5")}
              onClick={() => {
                isError ? window.location.href = "/auth/login" : addToCart()
              }}
            >
              {isCart ? "Savatga o'tish" : "Savatga qo’shish"}
            </Button>

            <div className="flex gap-5">
              {/* Add to wishlist */}
              <button onClick={() => addToWishlist()}>
                <span className="flex items-center gap-1">
                  <LikeIcon color={isWishlist ? "black" : "white"} />
                  <p>{isWishlist ? "Sevimlilarda" : "Sevimlilarga"}</p>
                </span>
              </button>

              {/* Ask question */}
              <button>
                <span className="flex items-center gap-2">
                  <QuestionIcon />
                  <p>Savol berish</p>
                </span>
              </button>

              {/* Share this product */}
              <button>
                <span className="flex items-center gap-2">
                  <ShareIcon />
                  <p>Ulashish</p>
                </span>
              </button>
            </div>

            <hr />

            {/* Seller profile */}
            <div className="flex items-center gap-2">
              <span className="flex items-end gap-2">
                <HumanIcon />
                <text className="font-semibold">Sotuvchi:</text>
              </span>
              <Link to={`/seller/details/${sellerData?.id}`} className="text-stone-400 underline">
                {sellerData?.name}
              </Link>
            </div>
          </div>
        </div>
      </CustomSuspanse>
      {/* begin:PRODUCT STARTER INFO */}

      {/* begin:PRODUCT ADDITIONAL INFO */}
      <div>
        <div className="border-b flex flex-wrap md:gap-10 gap-4 ">
          {/* -----Description----- */}
          <button
            className={`${tabs.id === 1 ? "border-b-2 border-black" : ""}  pb-1`}
            onClick={() =>
              setTabs({
                data: (
                  <ProductView_Description
                    data={productById.data?.data.gender}
                  />
                ),
                id: 1,
              })
            }
          >
            Description
          </button>

          {/* -----Additional Info----- */}
          <button
            className={`${tabs.id === 2 ? "border-b-2 border-black" : ""}  pb-1`}
            onClick={() =>
              setTabs({
                data: <ProductView_Info data="Additional info" />,
                id: 2,
              })
            }
          >
            Additional Info
          </button>

          {/* -----Reviwes(23)----- */}
          <button
            className={`${tabs.id === 3 ? "border-b-2 border-black" : ""} pb-1`}
            onClick={() =>
              setTabs({
                data: (
                  <ProductView_Review arr={reviews.data?.data?.results} />
                ),
                id: 3,
              })
            }
          >
            Reviwes
          </button>

          {/* -----Questions----- */}
          <button
            className={`${tabs.id === 4 ? "border-b-2 border-black" : ""}  pb-1`}
            onClick={() =>
              setTabs({
                data: (
                  <ProductView_Question arr={questions.data?.data.results} />
                ),
                id: 4,
              })
            }
          >
            Questions
          </button>
        </div>
        <div className="py-10">
          {
            reviews.isLoading || questions.isLoading
              ? "Loading"
              : <>{tabs.data}</>
          }
        </div>
      </div>
      {/* begin:PRODUCT ADDITIONAL INFO */}

      {/* begin:SAME PRODUCTS */}
      {
        sameProducts.isLoading
          ? ""
          : <ProductsListCarusel array={sameProducts.data?.data.results} title="O'xshash maxsulotlar" prevElClass='.swiper-button-prev' nextElClass='.swiper-button-next' />
      }
      {/* begin:SAME PRODUCTS */}

      {/* begin:RECENTLT VIEWED PRODUCTS */}
      {/* <ProductsListCarusel array={[]} title="Yaqinda ko'rib chiqilgan" prevElClass='.swiper-button-prev-1' nextElClass='.swiper-button-next-1' /> */}
      {/* begin:RECENTLT VIEWED PRODUCTS */}
    </div>
  )
}

type DescriptionProps = {
  data: string;
};
function ProductView_Description(props: DescriptionProps) {
  return <div dangerouslySetInnerHTML={{ __html: props.data }} />;
}

type InfoProps = {
  data: string;
};
function ProductView_Info(props: InfoProps) {
  return <div>{props.data}</div>;
}

type ReviewProps = {
  arr: review[];
};
function ProductView_Review(props: ReviewProps) {
  return (
    <Fragment>
      {props.arr.map((r: review, ind: number) => (
        <ProductReview
          key={ind}
          date={String(r.created_at)}
          img={
            r.client?.img ??
            "https://api-qabul.tkti.uz/uploads/file-1693294629138.jpg"
          }
          name={r.client?.name ?? "OKlar"}
          desc={r.comment ?? ""}
          rating={r.rating}
        />
      ))}
    </Fragment>
  );
}

type QuestionProps = {
  arr: question[];
};
function ProductView_Question({ arr }: QuestionProps) {
  return (
    <div>
      {arr &&
        arr.map((i: question, ind: number) => (
          <div className="flex flex-col mt-10 pb-5 border-b clgr" key={ind}>
            <div className="flex gap-5">
              <p className="">Question</p>
              <p className="font-bold">{i.question}</p>
            </div>
            <div className="flex gap-5">
              <p className="">Answer</p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="font-medium">{i.question}</p>
                  <span className="text-stone-300 text-sm">{i.answer}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
