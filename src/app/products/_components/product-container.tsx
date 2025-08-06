"use client";

import ProductCard from "@/components/shared/cards/product-card";
import ProductSkeleton from "@/components/shared/cards/product-skeleton";
import { TextEffect } from "@/components/ui/text-effect";
import { GetAllProductsResponse } from "@/types/products";
import { useProductFilterState } from "@/zustand/products/productFilter";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, CircleOff } from "lucide-react";
import { useEffect } from "react";

const ProductContainer = () => {
  const { category, experience, dosage } = useProductFilterState();

  const { data, isLoading, error } = useQuery<GetAllProductsResponse>({
    queryKey: ["products", category, experience, dosage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?category=${category}&experience=${experience}&dosage=${dosage}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    // Scroll to top on filter change
    window.scrollTo(0, 0);
  }, [category, experience, dosage]);

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  } else if (error) {
    content = (
      <div className="w-full flex flex-col gap-2 justify-center items-center min-h-[60vh] font-inter">
        <CircleOff className="h-7 w-7 text-red-600" />
        <p className="max-w-[400px] text-center text-14px text-tourHub-gray">
          <TextEffect per="char" preset="fade">
            {error?.message ??
              "An error occurred while fetching products. Please try again later."}
          </TextEffect>
        </p>
      </div>
    );
  } else if (data && data?.success && data.data.length === 0) {
    content = (
      <div className="w-full flex flex-col gap-2 justify-center items-center min-h-[60vh] font-inter">
        <CircleAlert className="h-5 w-5" />
        <p className="max-w-[400px] text-center text-14px text-tourHub-gray">
          <TextEffect per="char" preset="fade">
            No data available for the selected criteria. Please try different
            filters or check your connection!
          </TextEffect>
        </p>
      </div>
    );
  } else if (data && data?.success && data.data.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    );
  }

  return content;
};

export default ProductContainer;
