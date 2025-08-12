"use client";
import { LogOut } from "lucide-react";
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogoutClick: () => void;
}

export function TabNavigation({
  activeTab,
  onTabChange,
  onLogoutClick,
}: TabNavigationProps) {
  const tabs = ["My Profile", "Settings", "Purchase History"];

  return (
    <div className="flex justify-center  mb-8">
      <div className="flex space-x-8 justify-between w-full border-b border-[#e7e9ee]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-2 px-1 text-base font-medium border-b-2 leading-[120%] transition-colors ${
              activeTab === tab
                ? "border-[#6b46c1] text-[#6b46c1]"
                : "border-transparent text-[#727272] hover:text-[#4e4e4e]"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={onLogoutClick}
          className="pb-2 px-1 text-sm font-medium text-[#ff0004] hover:text-red-600 border-b-2 border-transparent"
        >
          <LogOut className="inline mr-1" />
          Log out
        </button>
      </div>
    </div>
  );
}
