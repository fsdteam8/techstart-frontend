const AddPurchaseModal = dynamic(
  () => import("@/components/shared/modals/purchase/add-purchase-modal"),
  {
    ssr: false,
  }
);
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProductAction = () => {
  const [open, seteOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-5">
        <Button className="flex-1" onClick={() => seteOpen((p) => !p)}>
          Purchase
        </Button>

        <Button variant="outline">Add to Cart</Button>
      </div>
      <AddPurchaseModal open={open} onOpenChange={seteOpen} />
    </>
  );
};

export default ProductAction;
