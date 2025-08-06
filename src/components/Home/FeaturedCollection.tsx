import Image from "next/image";
import { Leaf, Droplets, Cigarette, Candy } from "lucide-react";

const collections = [
  {
    title: "Gummies",
    image: "/featured-1.png",
    image2: "/featured-sub-1.png",
    icon: Candy,
  },
  {
    title: "Flowers",
    image: "/featured-2.png",
    image2: "/featured-sub-2.png",
    icon: Leaf,
  },
  {
    title: "Beverages",
    image: "/featured-3.png",
    image2: "/featured-sub-3.png",
    icon: Droplets,
  },
  {
    title: "Pre-Rolls",
    image: "/featured-4.png",
    image2: "/featured-sub-4.png",
    icon: Cigarette,
  },
];

export default function FeaturedCollection() {
  return (
    <div className="container mx-auto ">
      <div className="bg-white p-6 rounded-lg mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black font-cinzel">
          FEATURED COLLECTION
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-12 pb-4">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="relative group rounded-lg cursor-pointer min-w-[250px] h-[300px] shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
              />
              <div className="absolute inset-0" />

              {/* Title */}
              <div className="absolute bottom-14 left-[35%] z-10 flex">
                <h3 className="text-white text-2xl font-semibold">
                  {collection.title}
                </h3>
              </div>

              {/* Icon - This will be on top with z-50 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 -mb-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src={collection?.image2}
                    alt={collection.title}
                    width={1000}
                    height={1000}
                    className="w-8 h-8 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
