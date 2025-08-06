import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ProductCard = () => {
  return (
    <Card className="w-full max-w-sm rounded-[14px] overflow-hidden shadow-lg">
      <div className="relative h-[236px]">
        <Image
          src="https://images.pexels.com/photos/2731667/pexels-photo-2731667.jpeg"
          fill
          alt="Cannabis Product"
          className="object-cover"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">Cannabis Product 1</div>

        <div className="flex items-center gap-1 p-[8px] bg-[#F0EDF9] justify-between">
          <span className="font-semibold">Relaxing</span>
          <div>
            <div className="font-semibold flex items-center gap-1">
              <Image src="/icons/high.svg" alt="High" width={15} height={15} />{" "}
              High
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Tom Yum Soup is a classic aromatic Thai dish known for its bold
          combination of spicy, sour, salty, and sweet flavors.
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-900">$20.45</span>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
