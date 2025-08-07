"use client";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/ui/custom/productImageSwipe";
import { TextEffect } from "@/components/ui/text-effect";
import { fetchProductBySlug } from "@/lib/api/product";
import { GetProductBySlugResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { CircleOff, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ProductInformation from "./product-information";

const ProductGallery = dynamic(
  () => import("@/components/ui/custom/productImageSwipe"),
  {
    ssr: false,
  }
);

interface Props {
  decodedSlug: string;
}

const ProductDetailsContainer = ({ decodedSlug }: Props) => {
  const { data, isLoading, error, isError } =
    useQuery<GetProductBySlugResponse>({
      queryKey: ["productDetails", decodedSlug],
      queryFn: () => fetchProductBySlug(decodedSlug),
      staleTime: 1000 * 60 * 5, // optional
    });

  const productImages = useMemo(() => {
    return data?.data.photo.map((src, index) => ({
      id: index.toString(),
      src,
      alt: data.data.name ?? "",
      title: data.data.name ?? "",
    })) as ProductImage[];
  }, [data]);

  let content;

  if (isLoading) {
    content = (
      <div className="w-full flex flex-col gap-2 justify-center items-center h-[400px] font-inter">
        <Loader2 className="animate-spin text-primary" />
        <p className="animate-pulse">Loading product details...</p>
      </div>
    );
  } else if (isError) {
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
  } else if (data && data.success) {
    content = (
      <>
        <div className="flex gap-[30px] md:flex-row flex-col">
          <div className="flex-1">
            <ProductGallery images={productImages} />
          </div>
          <div className="flex-1">
            <ProductInformation product={data.data} />
          </div>
        </div>
      </>
    );
  }
  return (
    <Card className="container bg-white shadow-none md:shadow-md min-h-[400px] p-3 md:p-5">
      {content}
    </Card>
  );
};

export default ProductDetailsContainer;
