import { decodeSlug } from "@/lib/utils";
import ProductDetailsContainer from "./_components/product-details-container";
import TopProductDetailsBar from "./_components/top-product-details-bar";

const Page = ({ params }: { params: { slug: string } }) => {
  const decodedSlug = decodeSlug(params.slug);
  return (
    <div>
      <TopProductDetailsBar decodedSlug={decodedSlug} />
      <ProductDetailsContainer decodedSlug={decodedSlug} />
    </div>
  );
};

export default Page;
