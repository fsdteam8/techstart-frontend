import { Button } from "@/components/ui/button";

const ProductAction = () => {
  return (
    <div className="flex items-center gap-5">
      <Button className="flex-1">Purchase</Button>
      <Button variant="outline">Add to Cart</Button>
    </div>
  );
};

export default ProductAction;
