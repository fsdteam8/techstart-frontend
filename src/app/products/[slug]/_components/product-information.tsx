import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dosaceIcons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import useCartStore from "@/zustand/cart";
import Image from "next/image";
import { memo } from "react";

interface Props {
  product: Product;
}

const ProductInformation = ({ product: p }: Props) => {
  const {
    quantity,
    setQuantity,
    price: storedPrice,
    setPrice,
  } = useCartStore();
  return (
    <div className="space-y-[25px]">
      <div className="flex items-center justify-start gap-[20px]">
        <Button variant="default" className="cursor-not-allowed">
          <Image
            src={
              dosaceIcons[
                (p?.dosage as
                  | "Low Potency"
                  | "Medium Potency"
                  | "High Potency") ?? "High Potency"
              ]
            }
            alt={p?.dosage ?? "High"}
            width={15}
            height={15}
          />{" "}
          {p.dosage}
        </Button>
        <Button variant="default">
          ⭐ 48 <span className="text-[14px]">98</span>
        </Button>
      </div>

      <div>
        <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-semibold">
          {p.name}
        </h1>
        <p className="text-sm text-gray-600">{p.description}</p>
      </div>

      <div className="flex items-center justify-start gap-[20px]">
        {p.prices.map((price, index) => (
          <Button
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 h-auto px-[40px]",
              price.price !== storedPrice?.price &&
                "bg-black/20 hover:bg-black/30"
            )}
            onClick={() => {
              if (setPrice) {
                setPrice(price);
              }
            }}
            variant={price.price === storedPrice?.price ? "default" : "outline"}
          >
            <span className="font-semibold text-lg">
              {price.quantity}
              {price.unit}
            </span>
            <span>${price.price}</span>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-1 w-fit">
          <h5 className="text-[#707070]">QTY</h5>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1 w-fit">
          <h5>Total</h5>
          <span className="font-semibold">
            ${(quantity * (storedPrice?.price || 0)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInformation);
