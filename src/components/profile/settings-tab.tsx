import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SettingsTab() {
  return (
    <div className="p-8 bg-[#F0EDF9] rounded-lg">
      <h3 className="text-xl font-bold text-[#6b46c1] mb-6">Change password</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
            Current Password
          </label>
          <Input
            type="password"
            placeholder="############"
            className="border-[#e7e9ee] placeholder:text-[#6B46C1] w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              New Password
            </label>
            <Input
              type="password"
              placeholder="############"
              className="border-[#e7e9ee] placeholder:text-[#6B46C1]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Confirm New Password
            </label>
            <Input
              type="password"
              placeholder="############"
              className="border-[#e7e9ee] placeholder:text-[#6B46C1]"
            />
          </div>
        </div>
        <div className=" flex justify-end">
          <Button className="bg-[#6b46c1] hover:bg-[#301f57] text-white mt-6 px-[34px] py-[10px] cursor-pointer">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
