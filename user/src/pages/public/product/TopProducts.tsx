import { ReactElement } from 'react'
import { AxiosError, AxiosResponse } from "axios";

import { ProductCard } from '@/components';
import { CustomSuspanse } from '@/components/common';
import { SkeletonLoader } from '@/components/loaders';

import { useFetch } from "@/utils/api";

// type Props = {}

export const TopProducts = (/*props: Props*/): ReactElement => {
    const topProducts = useFetch<AxiosResponse, AxiosError>(["top-products"], "products/")

    return (
        <CustomSuspanse
            loading={topProducts.isLoading}
            loadingFallback={<SkeletonLoader />}
            error={topProducts.isError}
            errorFallback={"Error"}
        >
            <div className='py-10'>
                <h1 className='font-medium text-3xl text-center mb-10'>Top mahsulotlar</h1>
                <div className="flex flex-wrap justify-between">
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