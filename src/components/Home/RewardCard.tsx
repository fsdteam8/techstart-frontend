import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const RewardCard = () => {
  return (
    <div className="container mt-16">
      <div className="relative bg-[#6b46c1] py-6 text-white shadow-lg lg:px-28 md:px-12 px-8">
        {/* Main content */}
        <div className="relative z-10">
          {/* Title */}
          <div className="flex gap-2 -ml-2">
            <Image
              src={"/reward-icon.png"}
              alt="reward.png"
              width={1000}
              height={10000}
              className="h-8 w-8"
            />
            <h3 className="text-2xl font-bold mb-4">1G Grand Purp Rewards</h3>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Benefits list */}
            <div className="w-full md:w-auto">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                  <span>Get 20% off on select shopping</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                  <span>Earn points for every $1 you spend</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                  <span>Get $20 when you reach 200 points</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3"></span>
                  <span>Free to join — points add up automatically</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-auto self-center md:self-auto">
              {/* Join button */}
              <Button className="bg-inherit text-white border border-white/50 font-semibold rounded-lg transition-colors w-full md:w-auto px-8 py-2">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;