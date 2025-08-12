"use client";

import { useState } from "react";
import { TabNavigation } from "@/components/profile/tab-navigation";
import { MyProfileTab } from "@/components/profile/my-profile-tab";
import { SettingsTab } from "@/components/profile/settings-tab";
import { PurchaseHistoryTab } from "@/components/profile/purchase-history-tab";
import { LogoutModal } from "@/components/profile/logout-modal";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const purchaseHistory = [
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$400.00",
      date: "8 Dec, 2025",
      points: 40,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
    {
      name: "Red Flower",
      id: "#212-121",
      amount: "$200.00",
      date: "8 Dec, 2025",
      points: 20,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "My Profile":
        return <MyProfileTab />;
      case "Settings":
        return <SettingsTab />;
      case "Purchase History":
        return <PurchaseHistoryTab purchaseHistory={purchaseHistory} />;
      default:
        return <MyProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[##F9FAFC]">
      {/* Decorative leaves */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[307px] h-[704px] opacity-20">
        <Image
          width={160}
          height={80}
          src="/decoration/tree-left.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/3 w-[307px] h-[704px] opacity-20">
        <Image
          width={160}
          height={80}
          src="/decoration/tree-right.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#6b46c1] mb-8">Accounts</h2>
        </div>

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogoutClick={() => setShowLogoutModal(true)}
        />

        {/* Tab Content */}
        <div className=" rounded-lg shadow-sm">{renderTabContent()}</div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
