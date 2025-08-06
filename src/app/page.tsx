import ExperienceSelector from "@/components/Home/ExperienceSelector";
import FeaturedCollection from "@/components/Home/FeaturedCollection";
import Hero from "@/components/Home/Hero";
import RewardCard from "@/components/Home/RewardCard";
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

      <div>
        <FeaturedCollection />
      </div>

      <div>
        <RewardCard />
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
