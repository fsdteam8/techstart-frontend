import AboutComponent from "@/components/Home/AboutComponent";
import DiscountedProducts from "@/components/Home/DiscountedProducts";
import ExperienceSelector from "@/components/Home/ExperienceSelector";
import FeaturedCollection from "@/components/Home/FeaturedCollection";
import Hero from "@/components/Home/Hero";
import PopularProducts from "@/components/Home/PopularProducts";
import RewardCard from "@/components/Home/RewardCard";
import FaqComponent from "@/components/shared/section/Faq/FAQComponent";
import TreeWrapper from "@/providers/tree-wrapper";

const Page = () => {
  return (
    <div>
      <div className="z-10">
        <Hero />
      </div>

      <div className="z-20">
        <ExperienceSelector />
      </div>

      <TreeWrapper>
        <div>
          <FeaturedCollection />
        </div>

        <div>
          <RewardCard />
        </div>
      </TreeWrapper>

      <div>
        <PopularProducts />
      </div>

      <div>
        <DiscountedProducts />
      </div>

      <div>
        <AboutComponent />
      </div>

      <div>
        <FaqComponent />
      </div>
    </div>
  );
};

export default Page;
