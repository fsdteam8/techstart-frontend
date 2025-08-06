import Hero from "@/components/Home/Hero";
import ProductCard from "@/components/shared/cards/product-card";
import TreeWrapper from "@/providers/tree-wrapper";

const Page = () => {
  return (
    <div>
      <div>
        <Hero />
      </div>

      <TreeWrapper>
        <div className="bg-white py-[100px] container w-full h-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-[24px] mt-[200px]">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </TreeWrapper>
    </div>
  );
};

export default Page;
