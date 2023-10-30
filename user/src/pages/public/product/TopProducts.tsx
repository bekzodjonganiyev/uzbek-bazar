import { ReactElement } from 'react'
import { AxiosError, AxiosResponse } from "axios";

import { ProductCard, ProductSkeleton } from '@/components';
import { CustomSuspanse } from '@/components/common';

import { useFetch } from "@/utils/api";

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
                        topProducts.data?.data.results.map((item: any) => (
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
                </div>
            </div>
        </CustomSuspanse>
    )
}