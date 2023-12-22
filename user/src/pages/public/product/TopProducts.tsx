import { ReactElement } from 'react'
import { AxiosError, AxiosResponse } from "axios";

import { ProductCard, ProductSkeleton } from '@/components';
import { CustomSuspanse } from '@/components/common';

import { useFetch } from "@/utils/api";
import { productListType } from '@/interfaces/product';

// type Props = {}

export const TopProducts = (/*props: Props*/): ReactElement => {
    const topProducts = useFetch<AxiosResponse, AxiosError>(["top-products"], "products/", false)

    return (
        <CustomSuspanse
            loading={topProducts.isLoading}
            loadingFallback={
                <div className='flex flex-wrap justify-between gap-10 py-10'>
                    <ProductSkeleton limit={12} />
                </div>}
            error={topProducts.isError}
            errorFallback={"Error"}
        >
            <div className='py-10'>
                <h1 className='font-medium text-3xl text-center mb-10'>Top mahsulotlar</h1>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 sm:gap-10 gap-5">
                    {
                        topProducts.data?.data.results.map((item: productListType) => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                photo={item.photo}
                                price={item.price}
                                new_price={item.new_price}
                                discount={item.discount}
                                name={item.name}
                                // newBadge={item.newBadge}
                                rating={item.rating ?? 2}
                                material={item.material}
                                minimum_order_count={item.minimum_order_count}
                                season={item.season}
                            />
                        ))
                    }
                </div>
            </div>
        </CustomSuspanse>
    )
}