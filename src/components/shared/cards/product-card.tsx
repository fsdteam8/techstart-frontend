import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { truncate } from "@/lib/utils";
import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  data?: Product;
}

const image: Record<"Low Potency" | "Medium Potency" | "High Potency", string> =
  {
    "Low Potency": "/icons/low.svg",
    "Medium Potency": "/icons/medium.svg",
    "High Potency": "/icons/high.svg",
  };

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm rounded-[14px] overflow-hidden shadow-lg mx-auto">
      <div className="relative h-[236px]">
        <Image
          src={
            data?.photo[0] ??
            "https://images.pexels.com/photos/2731667/pexels-photo-2731667.jpeg"
          }
          fill
          alt={data?.name || "Product Image"}
          className="object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">{data?.name}</div>

        <div className="flex items-center gap-1 p-[8px] bg-[#F0EDF9] justify-between">
          <span className="font-semibold">
            {data?.experiences.map((exp) => exp).join(", ")}
          </span>
          <div>
            <div className="font-semibold flex items-center gap-1">
              <Image
                src={
                  image[
                    (data?.dosage as
                      | "Low Potency"
                      | "Medium Potency"
                      | "High Potency") ?? "High Potency"
                  ]
                }
                alt={data?.dosage ?? "High"}
                width={15}
                height={15}
              />{" "}
              {data?.dosage}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {truncate(data?.description ?? "", 126)}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-900">
            ${data?.prices[0].price}
          </span>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
            asChild
          >
            <Link href={`/products/${data?.name}`} className="w-fit">
              Buy Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
