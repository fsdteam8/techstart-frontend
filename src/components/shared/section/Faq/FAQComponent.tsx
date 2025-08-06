import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRightSquare } from "lucide-react";

export default function FaqComponent() {
  const faqData = [
    {
      id: "item-1",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      id: "item-2",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      id: "item-3",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      id: "item-4",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      id: "item-5",
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
  ];

  return (
    <div className="container">
      <div
        style={{
          backgroundImage: "url('/faq-bg.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
        className="relative overflow-hidden bg-[#f2ebff] p-6 lg:p-24 mt-28 rounded-lg"
      >
        <div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Frequently
                  <br />
                  Asked
                  <br />
                  Questions
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla.
                </p>
              </div>
              <Button className=" text-white px-8 py-3 rounded-lg font-medium">
                Explore All <ArrowRightSquare />
              </Button>
            </div>

            {/* Right Column - FAQ Accordion */}
            <div className="space-y-4">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="space-y-4"
              >
                {faqData.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-[#411c96] rounded-lg border-none overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-white hover:no-underline hover:bg-[#411c96] transition-colors [&[data-state=open]]:bg-[#411c96]">
                      <span className="text-left font-medium">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-purple-100 leading-relaxed bg-[#3b2377]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
