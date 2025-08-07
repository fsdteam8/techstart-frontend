"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilterState } from "@/zustand/products/productFilter";

interface Props {
  onStateChange?: () => void;
}

const StateSelector = ({ onStateChange }: Props) => {
  const { location, setLocation } = useProductFilterState();
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By State
      </h1>

      <Select
        value={location}
        onValueChange={(value) => {
          setLocation(value);
          onStateChange?.();
        }}
      >
        <SelectTrigger className="border-primary/50 border-[1px]   focus:ring-0 focus:border-primary">
          <SelectValue placeholder="Select locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All Locations</SelectItem>
          {usStates.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StateSelector;

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
