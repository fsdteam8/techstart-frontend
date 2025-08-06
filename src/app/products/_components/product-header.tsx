import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const ProductHeader = () => {
  return (
    <div className="h-[74px] w-full">
      <div className="hidden md:flex justify-between items-start">
        <h1 className="text-primary font-semibold text-[20px] md:text-[30px] ">
          Shop Products
        </h1>
        <span className="text-primary text-[14px] md:text-[16px] font-normal">
          24 products found
        </span>
      </div>

      <div className="md:hidden flex justify-between items-center">
        <div className=" flex flex-col justify-between items-start">
          <h1 className="text-primary font-semibold text-[20px] md:text-[30px] ">
            Shop Products
          </h1>
          <span className="text-primary text-[14px] md:text-[16px] font-normal">
            24 products found
          </span>
        </div>

        <Button>
          <Filter /> Filter
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
