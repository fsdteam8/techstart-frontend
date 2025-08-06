"use client";

import CategorySelector from "./filters/category-selector";
import ClearFilterButton from "./filters/clear-filter";
import DosageSelector from "./filters/dosage-selector";
import ExperienceSelector from "./filters/experience-selector";
import StateSelector from "./filters/state-selector";

const Sidebar = () => {
  return (
    <div className="hidden md:block w-[365px] bg-[#E9E3F6] rounded-[16px] py-[32px] px-[24px] space-y-[30px]">
      <StateSelector />
      <CategorySelector />
      <ExperienceSelector />
      <DosageSelector />
      <ClearFilterButton />
    </div>
  );
};

export default Sidebar;
