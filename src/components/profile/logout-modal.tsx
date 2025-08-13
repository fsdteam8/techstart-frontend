"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  if (!isOpen) return null;
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="text-xl font-bold text-[#212121] mb-2">
            Grand <span className="text-[#6b46c1]">Purp</span>
          </div>
          <h3 className="text-lg font-semibold text-[#212121] mb-6">
            Are You Sure To Log Out?
          </h3>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1 border-[#e7e9ee] text-[#727272] bg-transparent"
              onClick={handleLogout}
            >
              Yes
            </Button>
            <Button
              className="flex-1 bg-[#6b46c1] hover:bg-[#301f57] text-white "
              onClick={onClose}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
