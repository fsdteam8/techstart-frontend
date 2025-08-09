import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { checkoutSchema, CheckoutSchemaType } from "@/schema/purchase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CheckoutForm from "./_components/checkout-form";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const AddPurchaseModal = ({ onOpenChange, open }: Props) => {
  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  function onSubmit(values: CheckoutSchemaType) {
    console.log(values);
  }
  return (
    <ResponsiveDialog
      description=""
      open={open}
      onOpenChange={onOpenChange}
      title="Billing Information"
    >
      <div className="flex items-start gap-[30px]">
        <div className="flex-1">
          <CheckoutForm form={form} onSubmit={onSubmit} />
        </div>
        <div className="flex-1">fsdf</div>
      </div>
    </ResponsiveDialog>
  );
};

export default AddPurchaseModal;
