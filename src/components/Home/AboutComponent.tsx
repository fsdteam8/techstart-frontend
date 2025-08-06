import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutComponent() {
  return (
    <div className="container mt-16">
      <div className="p-6 rounded-lg bg-gray-50">
        <div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Mascot and branding */}
            <div className="relative bg-[#f4fbff] p-3 rounded-lg">
              <div className="absolute top-0 left-0 w-full">
                <div className="flex justify-between items-center -mb-16">
                  <div>
                    <h1 className="text-xl font-cinzel font-semibold text-gray-800 tracking-wide">
                      COMPLIANT. LEGAL. TRUSTED.
                    </h1>
                  </div>

                  <div>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                <Image
                  src="/cartoon.jpg"
                  alt="Grand Purp mascot character"
                  width={1000}
                  height={1000}
                  className="h-[500] w-[500] max-w-md"
                />
              </div>
            </div>

            {/* Right side - FAQ content */}
            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    Is it legal to buy hemp products from Grand Purp?
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes — all our products are derived from federally compliant
                  hemp containing less than 0.3% Δ9-THC. They are legal under
                  the 2018 Farm Bill and can be purchased by adults 21+ in most
                  states.
                </p>
                <button className="text-sm text-gray-800 font-medium hover:underline">
                  Read More
                </button>
              </div>

              {/* FAQ Item 2 */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  Are there any states where Grand Purp can&apos;t ship?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes. Some states restrict certain cannabinoids like Delta-8
                  and THCA. We block shipping to those states at checkout.
                  Please review our Shipping Policy for the latest restrictions.
                </p>
                <button className="text-sm text-gray-800 font-medium hover:underline">
                  Read More
                </button>
              </div>

              {/* FAQ Item 3 */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  Do I need a medical card to buy your products?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  No medical card is needed. Our hemp products are available for
                  direct purchase to adults 21 and over, no prescription or
                  registration required.
                </p>
                <button className="text-sm text-gray-800 font-medium hover:underline">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
