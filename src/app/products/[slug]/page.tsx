import CertificateOfAnalysis from "@/components/shared/section/certificate of analysis/page";
import { fetchProductBySlug } from "@/lib/api/product";
import { decodeSlug } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductDetailsContainer from "./_components/product-details-container";
import TopProductDetailsBar from "./_components/top-product-details-bar";
import WhereWeShip from "./_components/where-we-ship";

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
        <div className="mb-[100px]">
          <div className="space-y-10 container">
            <TopProductDetailsBar decodedSlug={decodedSlug} />
            <ProductDetailsContainer decodedSlug={decodedSlug} />
            <CertificateOfAnalysis />
          </div>
          <div className="bg-white ">
            <WhereWeShip />
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
