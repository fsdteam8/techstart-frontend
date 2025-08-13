"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, Check, X } from "lucide-react";

export function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: session } = useSession();

  // Password strength validation
  interface PasswordRequirement {
    label: string;
    test: (pwd: string) => boolean;
  }

  const passwordRequirements: PasswordRequirement[] = [
    { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    {
      label: "Contains uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      label: "Contains lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    { label: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
    {
      label: "Contains special character",
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  interface PasswordStrength {
    strength: number;
    label: string;
    color: string;
  }

  const getPasswordStrength = (password: string): PasswordStrength => {
    const passedRequirements = passwordRequirements.filter((req) =>
      req.test(password)
    ).length;
    if (passedRequirements === 0) return { strength: 0, label: "", color: "" };
    if (passedRequirements <= 2)
      return { strength: 1, label: "Weak", color: "text-red-500" };
    if (passedRequirements <= 3)
      return { strength: 2, label: "Fair", color: "text-yellow-500" };
    if (passedRequirements <= 4)
      return { strength: 3, label: "Good", color: "text-blue-500" };
    return { strength: 4, label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const validateForm = () => {
    if (!currentPassword.trim()) {
      toast.warning("Current password is required");
      return false;
    }

    if (!newPassword.trim()) {
      toast.warning("New password is required");
      return false;
    }

    // Check all password requirements
    const failedRequirements = passwordRequirements.filter(
      (req) => !req.test(newPassword)
    );
    if (failedRequirements.length > 0) {
      toast.error(
        `Password must meet all requirements: ${failedRequirements[0].label}`
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }

    if (currentPassword === newPassword) {
      toast.warning("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully");

        // Clear form after successful change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  interface PasswordToggleProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const PasswordToggle: React.FC<PasswordToggleProps> = ({ show, setShow }) => (
    <button
      type="button"
      onClick={() => setShow(!show)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B46C1] hover:text-[#301f57] transition-colors"
      tabIndex={-1}
    >
      {show ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );

  return (
    <div className="p-8 bg-[#F0EDF9] rounded-lg">
      <h3 className="text-xl font-bold text-[#6b46c1] mb-6">Change Password</h3>
      <div className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="border-[#e7e9ee] placeholder:text-[#6B46C1] w-full pr-12"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isLoading}
            />
            <PasswordToggle
              show={showCurrentPassword}
              setShow={setShowCurrentPassword}
            />
          </div>
        </div>

        <div className="md:flex items-start justify-between space-y-2 gap-4">
          {/* New Password */}
          <div className="flex-1 mt-2">
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="border-[#e7e9ee] placeholder:text-[#6B46C1] w-full pr-12"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
              <PasswordToggle
                show={showNewPassword}
                setShow={setShowNewPassword}
              />
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-[#4e4e4e]">
                    Password strength:
                  </span>
                  <span
                    className={`text-sm font-medium ${passwordStrength.color}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full ${
                        level <= passwordStrength.strength
                          ? passwordStrength.strength === 1
                            ? "bg-red-500"
                            : passwordStrength.strength === 2
                            ? "bg-yellow-500"
                            : passwordStrength.strength === 3
                            ? "bg-blue-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.test(newPassword);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        {isValid ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-gray-400" />
                        )}
                        <span
                          className={
                            isValid ? "text-green-600" : "text-gray-500"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className={`border-[#e7e9ee] placeholder:text-[#6B46C1] w-full pr-12 ${
                  confirmPassword && newPassword !== confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : confirmPassword && newPassword === confirmPassword
                    ? "border-green-500 focus:border-green-500"
                    : ""
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <PasswordToggle
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
              />
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <X size={16} />
                Passwords do not match
              </p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <Check size={16} />
                Passwords match
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button
            variant="outline"
            className="border-[#6b46c1] text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white px-6 py-2"
            onClick={() => {
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#6b46c1] hover:bg-[#301f57] text-white px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleChangePassword}
            disabled={
              isLoading ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              passwordStrength.strength < 3 // Require at least "Good" strength
            }
          >
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
