import ExperienceSelector from "@/components/Home/ExperienceSelector";
import Hero from "@/components/Home/Hero";
import ProductCard from "@/components/shared/cards/product-card";

const Page = () => {
  return (
    <div>
      <div className="z-10">
        <Hero />
      </div>

      <div className="z-20">
        <ExperienceSelector />
      </div>

      <div className="bg-white py-[100px] container w-full h-auto grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-[24px] mt-[200px]">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Page;
