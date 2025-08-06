import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-[650px] pb-24 text-white flex flex-col justify-center items-center lg:bg-gradient-to-r bg-gradient-to-b from-[#23173F] via-black to-black">
      <div className="container flex lg:flex-row flex-col gap-5 justify-between items-center relative z-0">
        <div>
          <h1 className="lg:text-[96px] text-[50px] lg:max-w-3xl font-bold font-cinzel lg:leading-[120px] text-center lg:text-start">
            Your High, Your Way...
          </h1>
          <div className="text-center lg:text-start">
            <button className="mt-4 mb-8">
              Not sure where to start? Take a quiz!
            </button>
          </div>

          <div className="space-x-5 text-center lg:text-start">
            <Button className="text-center">Shop Now</Button>
            <Button
              variant="outline"
              className="bg-transparent border border-white/50"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="z-10 ">
          <Image
            src={"/hero.png"}
            alt="hero.png"
            width={1000}
            height={1000}
            className="mix-blend-darken"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
