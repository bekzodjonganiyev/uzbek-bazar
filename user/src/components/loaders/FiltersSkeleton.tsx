import { Skeleton } from "@/components/ui/skeleton"

type FiltersSkeletonProps = {
  limit: number
}
export function FiltersSkeleton(props: FiltersSkeletonProps) {
  let arr: number[] = []
  
  for(let i = 1; i <= props.limit; i++){
    arr.push(i)
  }
  return (
    <>
      {
        arr.map((_, id) => (
          <div className="flex items-start flex-col gap-2" key={id}>
            <Skeleton className="h-2 w-44 rounded-none" />
            <Skeleton className="h-2 w-32 rounded-none " />
          </div>
        ))
      }
    </>
  )
}