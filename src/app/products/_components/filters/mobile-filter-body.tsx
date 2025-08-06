import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategorySelector from "./category-selector";
import ClearFilterButton from "./clear-filter";
import DosageSelector from "./dosage-selector";
import ExperienceSelector from "./experience-selector";
import StateSelector from "./state-selector";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileFilterBody = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Filter Products"
      description="Use the filters to narrow down your product search."
    >
      <ScrollArea className="h-[400px] px-4 ">
        <div className="pb-[30px] space-y-[25px]">
          <StateSelector />
          <CategorySelector onCategoryChange={() => onOpenChange(false)} />
          <ExperienceSelector onExperienceChange={() => onOpenChange(false)} />
          <DosageSelector onDosageChange={() => onOpenChange(false)} />
          <ClearFilterButton onReset={() => onOpenChange(false)} />
        </div>
      </ScrollArea>
    </ResponsiveDialog>
  );
};

export default MobileFilterBody;
