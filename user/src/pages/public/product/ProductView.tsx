import { ReactElement, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { Rating } from "react-simple-star-rating";

import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  HumanIcon,
  LikeIcon,
  QuestionIcon,
  ShareIcon,
} from "@/assets/icons";
import { CustomSuspanse } from "@/components/common";
import {
  ProductCarusel,
  ProductsListCarusel,
  ProductReview,
  ProductSkeleton,
} from "@/components";

import { useFetch } from "@/utils/api";
import { productColor, productMedia } from "@/interfaces/product";
import { review } from "@/interfaces/review";
import { question } from "@/interfaces/question";

// type Props = {}

export const ProductView = (/*props: Props*/): ReactElement => {
  const { id } = useParams();

  const [activeColor, setActiveColor] = useState<number>(1);

  const productById = useFetch<AxiosResponse, AxiosError>(
    ["product-by-id", id],
    `products/${id ?? ""}`
  );
  const sameProducts = useFetch<AxiosResponse, AxiosError>(
    ["same-products", id],
    `products/?type=${productById.data?.data.type}&season=${productById.data?.data.season}`,
    productById.isSuccess
  );
  const questions = useFetch<AxiosResponse, AxiosError>(["ions"], "questions/");
  const reviews = useFetch<AxiosResponse, AxiosError>(["product_reviews"], "reviews/");

  const [size, setSize] = useState<{ size: string; id: number | undefined }>({ size: "", id: undefined });
  const [tabs, setTabs] = useState<{ data: ReactElement; id: number | undefined; }>
    ({ data: <div>{productById.data?.data.gender}</div>, id: 1 });

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
        return [];
      }
    } catch {
      return [];
    }
  };

  return (
    <div className="flex flex-col gap-16 py-10 w-[90%] mx-auto">
      {/* begin:PRODUCT STARTER INFO */}
      <CustomSuspanse
        loading={productById.isLoading}
        error={productById.isError}
        loadingFallback={"Loading"}
        errorFallback={"Error"}
      >
        <div className="flex max-md:flex-col gap-10 justify-between">
          {/* Product images carusel */}
          <ProductCarusel images={getActiveMedia()} />

          {/* Product starter infos */}
          <div className="flex flex-col gap-5 md:w-1/2 mx-auto">
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
              <span>{productById.data?.data.price}</span>
              {productById.data?.data.discount > 0 && (
                <span className="line-through">
                  {productById.data?.data.price}
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
                      className={`border-black rounded-full ${getActiveColor(activeColor) === item ? "border-2" : ""
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

            {/* Size */}
            <div>
              <p className="mb-[5px]">Size:</p>
              <div className="space-x-3">
                {productById.data?.data?.size
                  ? productById.data?.data?.size.map((item: any) => (
                    <button
                      key={item.id}
                      className={`rounded-md p-2 border-2 ${size.id === item.id ? "border-black" : ""
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
            <Button variant={"default"} className="rounded-none py-5">
              Savatga qo’shish
            </Button>

            <div className="flex gap-5">
              {/* Add to wishlist */}
              <button>
                <span className="flex items-center gap-1">
                  <LikeIcon color="black" />
                  <p>Wishlist</p>
                </span>
              </button>

              {/* Ask question */}
              <button>
                <span className="flex items-center gap-2">
                  <QuestionIcon />
                  <p>Ask question</p>
                </span>
              </button>

              {/* Share this product */}
              <button>
                <span className="flex items-center gap-2">
                  <ShareIcon />
                  <p>Share</p>
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
              <Link to="" className="text-stone-400 underline">
                Terro Pro
              </Link>
            </div>
          </div>
        </div>
      </CustomSuspanse>
      {/* begin:PRODUCT STARTER INFO */}

      {/* begin:PRODUCT ADDITIONAL INFO */}
      <div>
        <div className="border-b flex gap-10">
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
            Reviwes(23)
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
      {sameProducts.isLoading ? (
        <div className='flex flex-wrap justify-between gap-10 py-10'>
          <ProductSkeleton limit={4} />
        </div>
      ) : (
        <ProductsListCarusel
          array={sameProducts.data?.data.results}
          title="O'xshash maxsulotlar"
          prevElClass=".swiper-button-prev"
          nextElClass=".swiper-button-next"
        />
      )}
      {/* begin:SAME PRODUCTS */}

      {/* begin:RECENTLT VIEWED PRODUCTS */}
      <ProductsListCarusel
        array={[]}
        title="Yaqinda ko'rib chiqilgan"
        prevElClass=".swiper-button-prev-1"
        nextElClass=".swiper-button-next-1"
      />
      {/* begin:RECENTLT VIEWED PRODUCTS */}
    </div>
  );
};

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
