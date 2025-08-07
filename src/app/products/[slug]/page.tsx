import { fetchProductBySlug } from "@/lib/api/product";
import { decodeSlug } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductDetailsContainer from "./_components/product-details-container";
import TopProductDetailsBar from "./_components/top-product-details-bar";

const Page = async ({ params }: { params: { slug: string } }) => {
  const decodedSlug = decodeSlug(params.slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["productDetails", decodedSlug],
    queryFn: () => fetchProductBySlug(decodedSlug),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TopProductDetailsBar decodedSlug={decodedSlug} />
        <ProductDetailsContainer decodedSlug={decodedSlug} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
