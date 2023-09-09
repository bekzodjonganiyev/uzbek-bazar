import { Skeleton } from "@/components/ui/skeleton"

type ProductSkeletonProps = {
  limit: number
}
export function ProductSkeleton(props: ProductSkeletonProps) {
  let arr: number[] = []
  
  for(let i = 1; i <= props.limit; i++){
    arr.push(i)
  }
  console.log(arr)
  return (
    <>
      {
        arr.map((_, id) => (
          <div className="flex items-start flex-col gap-2" key={id}>
            <Skeleton className="h-52 w-44 rounded-none" />
            <div className="flex gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <Skeleton className="h-2 w-44 rounded-none" />
            <Skeleton className="h-2 w-32 rounded-none " />
          </div>
        ))
      }
    </>
  )
}