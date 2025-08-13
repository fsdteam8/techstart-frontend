"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { GetAllCategoriesResponse } from "@/types/category";
import { useProductFilterState } from "@/zustand/products/productFilter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface CategorySelectorProps {
  onCategoryChange?: () => void;
}

const CategorySelector = ({ onCategoryChange }: CategorySelectorProps) => {
  const { category, setCategory } = useProductFilterState();
  const { data, isLoading, error } = useQuery<GetAllCategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`).then((res) =>
        res.json()
      ),
  });

  let content;

  if (isLoading) {
    content = Array.from({ length: 4 }).map((_, index) => (
      <CatSkeleton key={index} />
    ));
  } else if (error) {
    content = <div>Error loading categories</div>;
  } else if (data && data.data) {
    content = data.data.map((item) => (
      <Button
        className={cn(
          "flex flex-col items-center h-auto",
          item._id !== category && "bg-black/20 hover:bg-black/30"
        )}
        key={item._id}
        onClick={() => {
          setCategory(item._id);
          onCategoryChange?.();
        }}
      >
        <Image
          src={item.image}
          alt={item.categoryName}
          width={20}
          height={20}
        />
        <span className="text-[16px]">{item.categoryName}</span>
      </Button>
    ));
  } else {
    content = <div>No categories found</div>;
  }
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By Category
      </h1>

      <div className="grid grid-cols-2 gap-4">{content}</div>
    </div>
  );
};

export default CategorySelector;

const CatSkeleton = () => {
  return (
    <div className="flex flex-col items-center h-auto bg-black/10 rounded-md p-2 gap-2">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="w-16 h-4 rounded" />
    </div>
  );
};
