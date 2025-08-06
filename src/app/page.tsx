import DiscountedProducts from "@/components/Home/DiscountedProducts";
import ExperienceSelector from "@/components/Home/ExperienceSelector";
import FeaturedCollection from "@/components/Home/FeaturedCollection";
import Hero from "@/components/Home/Hero";
import PopularProducts from "@/components/Home/PopularProducts";
import RewardCard from "@/components/Home/RewardCard";

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

      <div>
        <PopularProducts />
      </div>

      <div>
        <DiscountedProducts />
      </div>
    </div>
  );
};

export default Page;
