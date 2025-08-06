import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CategorySelector = () => {
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By Category
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <Button className="flex flex-col items-center h-auto">
          <div>🪐</div>
          <span className="text-[16px]">Edibles</span>
        </Button>
        <Button
          className={cn(
            "flex flex-col items-center h-auto",
            true && "bg-black/20 hover:bg-black/30"
          )}
        >
          <div>🌿</div>
          <span className="text-[16px]">Prerolls</span>
        </Button>
        <Button
          className={cn(
            "flex flex-col items-center h-auto",
            true && "bg-black/20 hover:bg-black/30"
          )}
        >
          <div>🪐</div>
          <span className="text-[16px]">Edibles</span>
        </Button>
        <Button
          className={cn(
            "flex flex-col items-center h-auto",
            true && "bg-black/20 hover:bg-black/30"
          )}
        >
          <div>🌿</div>
          <span className="text-[16px]">Prerolls</span>
        </Button>
      </div>
    </div>
  );
};

export default CategorySelector;
