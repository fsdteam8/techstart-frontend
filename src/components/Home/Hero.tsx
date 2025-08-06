import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-[650px] text-white flex flex-col justify-center items-center bg-gradient-to-r from-[#23173F] via-black to-black">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="lg:text-[96px] lg:max-w-3xl font-bold font-cinzel leading-[120px]">
            Your High, Your Way...
          </h1>
          <button className="mt-4 mb-8">
            Not sure where to start? Take a quiz!
          </button>

          <div className="space-x-5">
            <Button className="h-[58px] w-[246px] text-center">Shop Now</Button>
            <Button className="bg-inherit border border-white hover:border-none h-[58px] w-[246px] text-center">
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
