import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StateSelector = () => {
  return (
    <div className="w-full space-y-[24px]">
      <h1 className="text-primary font-semibold text-[20px] border-b-primary/80 border-b-2 pb-[8px]">
        Shop By State
      </h1>

      <Select>
        <SelectTrigger className="border-primary/50 border-[1px]  focus:ring-0 focus:border-primary">
          <SelectValue placeholder="Select locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="dhaka">Dhaka</SelectItem>
          <SelectItem value="chittagong">Chittagong</SelectItem>
          <SelectItem value="khulna">Khulna</SelectItem>
          <SelectItem value="rajshahi">Rajshahi</SelectItem>
          <SelectItem value="sylhet">Sylhet</SelectItem>
          <SelectItem value="barisal">Barisal</SelectItem>
          <SelectItem value="rangpur">Rangpur</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StateSelector;
