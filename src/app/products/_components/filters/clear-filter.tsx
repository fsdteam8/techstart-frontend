"use client";
import { Button } from "@/components/ui/button";
import { useProductFilterState } from "@/zustand/products/productFilter";

interface Props {
  onReset?: () => void;
}

const ClearFilterButton = ({ onReset }: Props) => {
  const { reset } = useProductFilterState();
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        reset();
        onReset?.();
      }}
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilterButton;
