"use client";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
const MobileFilterBody = dynamic(() => import("./mobile-filter-body"), {
  ssr: false,
});

const MobileFilter = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen((p) => !p)}>
        <Filter /> Filter
      </Button>

      {open && <MobileFilterBody open={open} onOpenChange={setOpen} />}
    </div>
  );
};

export default MobileFilter;
