import { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RotatingLines } from "react-loader-spinner";
// import { AxiosError, AxiosResponse } from 'axios';

import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/assets/icons"
// import { ProductCard } from '@/components';

import { seacrFc } from '@/utils/searchFn';
import { CustomSuspanse } from '@/components/common';
// import { useFetch } from '@/utils/api';

// type Props = {}

export const SearchPage = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchedProductData, setSearchedProductData] = useState<any>({
    loading: undefined,
    data: null,
    error: null
  })
  const [searchedCategoryData, setSearchedCategoryData] = useState<any>({
    loading: undefined,
    data: null,
    error: null
  })

  // const productArr = useFetch<AxiosResponse, AxiosError>(["products"], `products/`, false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchTerm ? seacrFc("products", "search", searchTerm, setSearchedProductData) : null
      searchTerm ? seacrFc("categories", "search", searchTerm, setSearchedCategoryData) : null
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div>

      {/* -----INPUT----- */}
      <div className='flex items-center justify-center mt-10'>
        <div className="relative max-md:w-full">
          {/* TODO - icon bosilganda search qilishi kerak */}
          <SearchIcon className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2" />
          <Input className='md:w-[500px]' placeholder='Mahsulot izlash...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* -----FAST SEARCH----- */}
      <div className='flex items-center justify-center gap-5 mt-3 mb-10 max-sm:text-xs max-md:text-sm'>
        <p className='text-gray-400 inline'>Tezkor qidiruv:</p>
        <div className='flex gap-3'>
          <span className='cursor-pointer' onClick={() => setSearchTerm("Futbolkalar")}>Futbolkalar</span>
          <span className='cursor-pointer' onClick={() => setSearchTerm("Ko’ylaklar")}>Ko’ylaklar</span>
          <span className='cursor-pointer' onClick={() => setSearchTerm("Shimlar")}>Shimlar</span>
          <span className='cursor-pointer' onClick={() => setSearchTerm("Yoz")}>Yoz</span>
        </div>
      </div>

      <div className='md:w-[500px] mx-auto'>
        <CustomSuspanse
          loading={searchedCategoryData?.loading}
          loadingFallback={<div className='flex items-center justify-center py-10'><RotatingLines width="50" strokeWidth='2' /></div>}
          error={searchedCategoryData?.error}
          errorFallback={searchedCategoryData?.error}
        >

          {/* -----SEARCH RESULT BY CATEGORY----- */}
          {
            searchedCategoryData?.data
              ? <div className='flex flex-wrap gap-2 mb-10'>
                {
                  searchedCategoryData?.data?.length === 0 && searchedProductData?.data?.length === 0
                    ? ""
                    : searchedCategoryData?.data?.map((item: any) => (
                      <Link
                        key={item.id}
                        to={{
                          pathname: `/catalog/${item.slug}`,
                        }}
                        state={{ category_id: item.id }}
                        className='py-2 px-4 rounded-lg bg-stone-100'
                      >
                        <button>🚧 {item.name}</button>
                      </Link>
                    ))
                }
              </div>
              : null
          }

          {/* -----SEARCH RESULT BY PRODUCT----- */}
          <div className='overflow-x-hidden overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-thumb-r h-80  mb-10'>
            {
              searchedProductData?.data?.length === 0 && searchedCategoryData?.data?.length === 0
                ? <p className='text-center'>Qidiruvga mos natijalalar topilmadi</p>
                : searchedProductData?.data?.map((item: any) => (
                  <Link to={`/product/details/${item.id}`} key={item.id}>
                    <button className='w-full border rounded-md'>
                      <div className='flex items-center gap-5 p-2 hover:bg-stone-100 rounded-md cursor-pointer'>
                        <div className='w-11 h-12'>
                          <LazyLoadImage
                            src={item.photo}
                            alt={item.name}
                            effect={'opacity'}
                            height="100%"
                            width="100%"
                            className='h-full w-full object-cover'
                          />
                        </div>

                        <p className='md:text-xl sm:text-lg text-sm font-medium line-clamp-1'>{item.name}</p>
                      </div>
                    </button>
                  </Link>
                ))
            }
          </div>
        </CustomSuspanse>
      </div>
      {/* DEFAULT DATA FOR SEARCH PAGE */}
      {/* <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-5">
        {
          productArr.data?.data.results.map((item: any) => (
            <ProductCard
              key={Number(item.id)}
              id={+item.id}
              img={item.photo}
              price={item.price}
              oldPrice={item.oldPice}
              discount={item.discount}
              productName={item.name}
              newBadge={item.newBadge}
              rating={item.rating ?? 2}
            />
          ))
        }
      </div> */}
    </div>
  )
}