import { Skeleton } from "@/components/ui/skeleton"

export function SellersSkeleton() {
    return (
        <div className="flex items-start max-md:flex-col-reverse gap-48 w-full">
            <div className="flex flex-col gap-5 md:w-1/2 w-full">
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-80 rounded-none " />
                <br />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-80 rounded-none " />
                <br />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-80 rounded-none " />
                <div className="flex gap-3 mt-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </div>
            <Skeleton className="h-96 animate-pulse rounded-none md:w-1/2 w-full" />
        </div>

    )
}