"use client";

import ProductCard from "@/components/shared/cards/product-card";
import ProductSkeleton from "@/components/shared/cards/product-skeleton";
import { GetAllProductsResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

const ProductContainer = () => {
  const { data, isLoading, error } = useQuery<GetAllProductsResponse>({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`).then((res) =>
        res.json()
      ),
  });

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
    content = <div className="text-red-500">Error loading products</div>;
  } else if (data && data?.success) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.data.map((product) => (
          <ProductCard key={product._id} />
        ))}
      </div>
    );
  }

  return content;
};

export default ProductContainer;
