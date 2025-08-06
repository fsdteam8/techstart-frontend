import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <Card className="w-full max-w-sm rounded-[14px] overflow-hidden shadow-lg">
      {/* Image Skeleton */}
      <div className="relative h-[236px] w-full">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-5 w-3/4" />

        {/* Tag Skeleton */}
        <div className="flex items-center gap-1 p-[8px] bg-[#F0EDF9] justify-between">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />

        {/* Price + Button Skeleton */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSkeleton;
