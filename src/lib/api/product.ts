// lib/api/products.ts
import { GetProductBySlugResponse } from "@/types/products";

export const fetchProductBySlug = async (
  slug: string
): Promise<GetProductBySlugResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/slug/${slug}`
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
