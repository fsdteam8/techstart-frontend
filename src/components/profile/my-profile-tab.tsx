import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RewardPointsCard } from "./reward-points-card";
import Image from "next/image";
import { Edit } from "lucide-react";

export function MyProfileTab() {
  return (
    <div className="">
      <div className="flex items-start justify-between mb-8 bg-[#F0EDF9] rounded-lg">
        <div className="flex items-center space-x-4 p-8 rounded-lg">
          <Image
            width={150}
            height={150}
            src="/placeholder.svg?height=80&width=80"
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold text-[#645949]">
              Bessie Edwards
            </h3>
            <p className="text-[#645949]">@besseedwards</p>
            <p className="text-sm text-[#645949]">
              3891 Ranchview Dr. Richardson, California 123456
            </p>
          </div>
        </div>
        <RewardPointsCard points={200} />
      </div>

      <div className="space-y-8 *:text-[#6B46C1]">
        <div className="bg-[#F0EDF9] p-8 rounded-lg">
          <div className="flex items-center justify-between mb-4]">
            <h4 className="text-lg font-semibold text-[#6b46c1]">
              Personal Information
            </h4>
            <Button
              variant="outline"
              size="sm"
              className="text-white bg-[#6b46c1] border-[#6b46c1]  px-[38px] py-[10px]"
            >
              <Edit className="" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                First Name
              </label>
              <Input defaultValue="Bessie" className="border-[#e7e9ee]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Last Name
              </label>
              <Input defaultValue="Edwards" className="border-[#e7e9ee]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Email Address
              </label>
              <Input
                defaultValue="alma.lawson@example.com"
                className="border-[#e7e9ee]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Phone
              </label>
              <Input
                defaultValue="(307) 555-0133"
                className="border-[#e7e9ee]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Bio
            </label>
            <Textarea
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              className="border-[#e7e9ee] min-h-[100px]"
            />
          </div>
        </div>

        <div className="bg-[#F0EDF9] p-8 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-[#6b46c1]">Address</h4>
            <Button
              variant="outline"
              size="sm"
              className="text-white bg-[#6b46c1] border-[#6b46c1] px-[38px] py-[10px]"
            >
              <Edit className="" /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Country
              </label>
              <Input defaultValue="USA" className="border-[#e7e9ee]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                City/State
              </label>
              <Input defaultValue="Alabama" className="border-[#e7e9ee]" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Road/Ave
            </label>
            <Input
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              className="border-[#e7e9ee]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Postal Code
              </label>
              <Input defaultValue="588558" className="border-[#e7e9ee]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                TAX ID
              </label>
              <Input
                defaultValue="AFNY7555-0133"
                className="border-[#e7e9ee]"
              />
            </div>
          </div>
        </div>

        <Button className="bg-[#6B46C1] hover:bg-[#301f57] !text-white">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
