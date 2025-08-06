"use client";
import { Button } from "@/components/ui/button";
import { useProductFilterState } from "@/zustand/products/productFilter";

const ClearFilterButton = () => {
  const { reset } = useProductFilterState();
  return (
    <Button variant="outline" className="w-full" onClick={reset}>
      Clear Filters
    </Button>
  );
};

export default ClearFilterButton;
