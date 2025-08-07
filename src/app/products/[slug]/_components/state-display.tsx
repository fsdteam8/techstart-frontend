import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { usStates } from "../../_components/filters/state-selector";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactNode;
  restrictedStates: string[];
}

const StateDisplay = ({ open, setOpen, trigger, restrictedStates }: Props) => {
  const availableStates = usStates.filter(
    (item) => !restrictedStates.includes(item)
  );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Available states</AlertDialogTitle>
          <AlertDialogDescription>
            {availableStates.map((state) => (
              <Badge key={state} className="mr-2 mb-2">
                {state}
              </Badge>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StateDisplay;
