import { Button } from "@/components/ui/button";
import { dosaceIcons } from "@/constants/icons";
import { Product } from "@/types/products";
import Image from "next/image";
import { memo } from "react";

interface Props {
  product: Product;
}

const ProductInformation = ({ product: p }: Props) => {
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
            className="flex flex-col items-center gap-1 h-auto px-[40px]"
          >
            <span className="font-semibold text-lg">
              {price.quantity}
              {price.unit}
            </span>
            <span>${price.price}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
