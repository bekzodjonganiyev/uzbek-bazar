import { ReactElement, useState, Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { Rating } from "react-simple-star-rating";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { EyeIcon, HumanIcon, LikeIcon, QuestionIcon, ShareIcon } from "@/assets/icons";
import { CustomSuspanse } from "@/components/common";
import { ProductCarusel, ProductsListCarusel, ProductReview } from "@/components";

import { RootState, useAppDispatch } from "@/redux"
import { setCartId, deleteCartId } from "@/redux/actions/cart-action"
import { setWishlistId, deleteWishlistId } from "@/redux/actions/wishlist-action"
import { useFetch, usePost } from "@/utils/api";
import { cn } from "@/lib/utils";
import { productColor, productMedia } from "@/interfaces/product";
import { review } from "@/interfaces/review";
import { question } from "@/interfaces/question";
import { getMachineId } from "@/utils/getSeesionId";

// type Props = {}

export const ProductView = (/*props: Props*/): ReactElement => {
  const { id } = useParams();
  const cart = useSelector((state: RootState) => state.cart)
  const wishlist = useSelector((state: RootState) => state.wishlist)
  const dispatch = useAppDispatch()

  const machineId = getMachineId()

  const productById = useFetch<AxiosResponse, AxiosError>(["product-by-id", id], `products/${id ?? ""}`, false);
  const sameProducts = useFetch<AxiosResponse, AxiosError>(["same-products", id], `products/?type=${productById.data?.data.type}&season=${productById.data?.data.season}`, false, productById.isSuccess);
  const seller = useFetch<AxiosResponse, AxiosError>(["seller", productById.data?.data.organization], `/organizations/?id=${productById.data?.data.organization}`, false, productById.isFetched);
  const questions = useFetch<AxiosResponse, AxiosError>(["ions"], "questions/", false);
  const reviews = useFetch<AxiosResponse, AxiosError>(["product_reviews"], "reviews/", false);

  const cartMutationPost = usePost("post", () => { }, () => { })
  const cartMutationDelete = usePost("delete", () => { }, () => { })
  const wishlistMutationPost = usePost("post", () => { }, () => { })
  const wishlistMutationDelete = usePost("delete", () => { }, () => { })

  const [activeColor, setActiveColor] = useState<number>(1);
  const [defaultImg, setDefaultImg] = useState<string[]>([]);
  const [sellerData, setSellerData] = useState<any>(null);
  const [size, setSize] = useState<{ size: string; id: number | undefined }>({ size: "", id: undefined });
  const [tabs, setTabs] = useState<{ data: ReactElement; id: number | undefined; }>
    ({ data: <div>{productById.data?.data.gender}</div>, id: 1 });

  const productIdsForCart = cart?.ids.map((i) => i.id)
  const productIdsForWishlist = wishlist?.ids.map((i) => i.id)
  const isCart = productIdsForCart.includes(productById.data?.data.id)
  const isWishlist = productIdsForWishlist.includes(productById.data?.data.id)

  // ADD TO WISHLIST
  const addToWishlist = () => {
    if (!isWishlist) {
      wishlistMutationPost.mutateAsync({
        url: "favorites/",
        data: {
          session_id: machineId, // TODO - login qilinganda null ketadi
          product: productById.data?.data.id,
          user: null
        }
      })
        .then(res => dispatch(setWishlistId(productById.data?.data.id, res.data.id, "")))
        .catch(err => console.log(err))
    } else {
      const temp: any = wishlist.ids.find(item => item.id === productById.data?.data.id) // { id: <id>, wishlistId: <wishlistId> }

      wishlistMutationDelete.mutateAsync({
        url: `favorites/${temp.wishlistId}`,
        data: {}
      })
        .then(() => { dispatch(deleteWishlistId(productById.data?.data.id, temp.wishlistId, "")) })
        .catch(err => console.log(err))
    }
  }

  // ADD TO CART
  const addToCart = () => {
    if (!isCart) {
      cartMutationPost.mutateAsync({
        url: "carts/",
        data: {
          session_id: machineId, // TODO - login qilinganda null ketadi
          quantity: 1,
          product: productById.data?.data.id,
          user: null // TODO - login qilinganda user_id ketadi
        }
      })
        .then(res => dispatch(setCartId(productById.data?.data.id, res.data.id, "")))
        .catch(err => console.log(err))
    } else {
      const temp: any = cart.ids.find(item => item.id === productById.data?.data.id) // { id: <id>, cartId: <cartId> }

      cartMutationDelete.mutateAsync({
        url: `carts/${temp.cartId}`,
        data: {}
      })
        .then(() => { dispatch(deleteCartId(productById.data?.data.id, temp.cartId, "")) })
        .catch(err => console.log(err))
    }
  }

  // HELPER FOR IMG CARUSEL
  const getActiveColor = (index: number) => {
    try {
      const variables: productColor[] = productById.data?.data.variables;

      if (variables.length > 0 && variables.length >= index) {
        return variables[index];
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const getActiveMedia = (): string[] => {
    try {
      const currentColor = getActiveColor(activeColor);
      if (currentColor) {
        const matchedMedia = currentColor.media.map((e: productMedia) => {
          return e.file;
        });
        return matchedMedia;
      } else {
        return defaultImg;
      }
    } catch {
      return [];
    }
  };

  // GET SELLER DATA
  useEffect(() => {
    const sellerData = seller.isFetched && seller.data?.data?.results.filter((item: any) => item.id === productById.data?.data.organization)
    setSellerData(sellerData[0])
  }, [seller.isFetched])

  useEffect(() => {
    const arr = productById.isFetched && productById.data?.data.variables?.map((item: any, id: number) => item.media[id]?.file)
    setDefaultImg(arr)
  }, [productById.isFetched])

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

            {/* Color */}
            <div>
              <p className="mb-[5px]">Color:</p>
              <div className="flex gap-2">
                {productById.data?.data.variables.map(
                  (item: productColor, ind: number) => (
                    <div
                      className={`border-black rounded-full p-0.5 ${getActiveColor(activeColor) === item ? "border-2 border-dashed" : ""
                        }`}
                    >
                      <button
                        style={{ backgroundColor: item.color }}
                        key={item.id}
                        className={`p-4 border-2 rounded-full`}
                        onClick={() => setActiveColor(ind)}
                      ></button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="mb-[5px]">Size:</p>
              <div className="space-x-3">
                {productById.data?.data?.size
                  ? productById.data?.data?.size.map((item: any) => (
                    <button
                      key={item.id}
                      className={`rounded-md p-2 border-2 ${size.id === item.id ? "border-black  border-dashed" : ""
                        }`}
                      onClick={() => setSize({ size: item, id: item.id })}
                    >
                      {item.name}
                    </button>
                  ))
                  : null}
              </div>
            </div>

            {/* Add to cart */}
            <Button
              variant={"default"}
              className={cn("rounded-none py-5")}
              onClick={() => addToCart()}
            >
              {isCart ? "Savatda" : "Savatga qo’shish"}
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
                { sellerData?.name }
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
