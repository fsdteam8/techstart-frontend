"use client";
import { Button } from "@/components/ui/button";
import { useProductFilterState } from "@/zustand/products/productFilter";

const data = [
  {
    id: 1,
    name: "Relaxing",
    value: "Relaxing",
  },
  {
    id: 2,
    name: "Energizing",
    value: "Energizing",
  },
  {
    id: 3,
    name: "Creative",
    value: "Creative",
  },
  {
    id: 4,
    name: "Social",
    value: "Social",
  },
  {
    id: 5,
    name: "Sleep",
    value: "Sleep",
  },
  {
    id: 6,
    name: "Focus",
    value: "Focus",
  },
  {
    id: 7,
    name: "Happy",
    value: "Happy",
  },
];

interface ExperienceSelectorProps {
  onExperienceChange?: () => void;
}

const ExperienceSelector = ({
  onExperienceChange,
}: ExperienceSelectorProps) => {
  const { experience, setExperience } = useProductFilterState();
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By Experiences
      </h1>

      <div className="flex flex-wrap gap-[16px]">
        {data.map((item) => (
          <Button
            variant={experience === item.value ? "default" : "outline"}
            key={item.id}
            onClick={() => {
              setExperience(item.value);
              onExperienceChange?.();
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSelector;
