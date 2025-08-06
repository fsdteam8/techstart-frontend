import { Button } from "@/components/ui/button";

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

const ExperienceSelector = () => {
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By State
      </h1>

      <div className="flex flex-wrap gap-[16px]">
        {data.map((item) => (
          <Button variant="outline" key={item.id}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSelector;
