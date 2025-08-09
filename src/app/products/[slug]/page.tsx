import CertificateOfAnalysis from "@/components/shared/section/certificate of analysis/page";
import FaqComponent from "@/components/shared/section/Faq/FAQComponent";
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
        <div className="container">
          <TopProductDetailsBar decodedSlug={decodedSlug} />
        </div>
        <div className="mb-[100px] space-y-10">
          <div className="space-y-10 container">
            <ProductDetailsContainer decodedSlug={decodedSlug} />
            <CertificateOfAnalysis />
          </div>
          <div className="bg-white md:py-[50px]">
            <WhereWeShip />
          </div>

          <FaqComponent />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
