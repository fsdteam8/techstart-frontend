"use client";
import { Button } from "@/components/ui/button";
import { useProductFilterState } from "@/zustand/products/productFilter";
import Image from "next/image";

const data = [
  {
    id: 1,
    name: (
      <div className="flex items-center gap-2">
        <Image src="/icons/low.svg" alt="Low Potency" width={10} height={10} />
        <span className="text-xs">Low Potency</span>
      </div>
    ),
    value: "Low Potency",
  },
  {
    id: 2,
    name: (
      <div className="flex items-center gap-2">
        <Image
          src="/icons/medium.svg"
          alt="Medium Potency"
          width={10}
          height={10}
        />
        <span className="text-xs">Medium Potency</span>
      </div>
    ),
    value: "Medium Potency",
  },
  {
    id: 3,
    name: (
      <div className="flex items-center gap-2">
        <Image
          src="/icons/high.svg"
          alt="High Potency"
          width={10}
          height={10}
        />
        <span className="text-xs">High Potency</span>
      </div>
    ),
    value: "High Potency",
  },
];

interface DosageSelectorProps {
  onDosageChange?: () => void;
}

const DosageSelector = ({ onDosageChange }: DosageSelectorProps) => {
  const { dosage, setDosage } = useProductFilterState();
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By Dosage
      </h1>

      <div className="flex flex-wrap gap-[16px]">
        {data.map((item) => (
          <Button
            variant={dosage === item.value ? "default" : "outline"}
            key={item.id}
            onClick={() => {
              setDosage(item.value);
              onDosageChange?.();
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DosageSelector;
