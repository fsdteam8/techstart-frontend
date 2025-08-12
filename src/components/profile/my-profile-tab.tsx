"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RewardPointsCard } from "./reward-points-card";
import Image from "next/image";
import { Edit, Save, X, Upload, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  userName: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  texId: z.string().min(1, "Tax ID is required"), // Fixed typo: texId -> taxId
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserProfile {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string;
  phone: string | null;
  isVerified: boolean;
  ageVerification: boolean;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  texId: string | null; // Fixed typo: texId -> taxId
  points: number;
  imageLink: string | null;
  resetPasswordOtp: string | null;
  resetPasswordOtpExpires: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export function MyProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
      texId: "", // Fixed typo: texId -> taxId
    },
  });

  const getAuthToken = () => {
    if (session?.user?.accessToken) {
      // Added optional chaining
      return session.user.accessToken as string;
    }
    return "YOUR_HARDCODED_TOKEN_HERE";
  };

  const fetchUserProfile = async (): Promise<UserProfile> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }

    const response = await fetch(`${baseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    const data: ApiResponse = await response.json();
    return data.data;
  };

  const updateUserProfile = async (
    profileData: ProfileFormData & { image?: File }
  ): Promise<UserProfile> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }

    const formData = new FormData();

    // Fixed the FormData append logic
    Object.entries(profileData).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    const response = await fetch(`${baseUrl}/user/update-profile`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        // Removed Content-Type header to let browser set it with boundary for FormData
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update profile");
    }

    const data: ApiResponse = await response.json();
    return data.data;
  };

  const deleteUserProfile = async (): Promise<void> => {
    // Fixed: Using NEXT_PUBLIC_API_URL instead of NEXT_PUBLIC_TEACHSTAR_URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error("API URL is not configured");
    }

    const response = await fetch(`${baseUrl}/user/delete-profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete profile");
    }
  };

  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: 2, // Added retry logic
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        userName: userProfile.userName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        country: userProfile.country || "",
        state: userProfile.state || "",
        city: userProfile.city || "",
        address: userProfile.address || "",
        texId: userProfile.texId || "", // Fixed typo: texId -> taxId
      });
    }
  }, [userProfile, form]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["userProfile"], data);
      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
      toast.success("Profile updated successfully!");
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      toast.success("Profile deleted successfully!");
      // Clear the query cache
      queryClient.clear();
      // Optionally redirect user or clear session
      // signOut() // Uncomment if you want to sign out after deletion
    },
    onError: (error: Error) => {
      console.error("Profile delete error:", error);
      toast.error(error.message || "Failed to delete profile");
    },
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate({
      ...data,
      ...(selectedImage && { image: selectedImage }),
    });
  };

  const handleCancel = () => {
    // Prevent multiple rapid clicks
    if (updateProfileMutation.isPending) return;

    setIsEditing(false);
    setSelectedImage(null);
    setImagePreview(null);

    // Reset form with current user data
    if (userProfile) {
      form.reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        userName: userProfile.userName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        country: userProfile.country || "",
        state: userProfile.state || "",
        city: userProfile.city || "",
        address: userProfile.address || "",
        texId: userProfile.texId || "",
      });
    }
  };

  const handleDeleteProfile = () => {
    if (showDeleteConfirmation) {
      deleteProfileMutation.mutate();
      setShowDeleteConfirmation(false);
    } else {
      setShowDeleteConfirmation(true);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B46C1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Failed to load profile data:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["userProfile"] })
          }
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-8 bg-[#F0EDF9] rounded-lg px-4 sm:px-6 lg:px-8 gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-center lg:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Image
              width={120}
              height={120}
              src={
                imagePreview ||
                userProfile.imageLink ||
                "/placeholder.svg?height=120&width=120&query=profile avatar"
              }
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-[#5a3ba3] shadow-lg"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#6B46C1] text-white rounded-full p-2 shadow-lg hover:bg-[#5a3ba3] transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#645949]">
              {userProfile.firstName || "First"}{" "}
              {userProfile.lastName || "Last"}
            </h3>
            <p className="text-[#645949]">@{userProfile.userName}</p>
            <p className="text-sm text-[#645949] mt-1 max-w-xs">
              {[userProfile.address, userProfile.city, userProfile.state]
                .filter(Boolean)
                .join(", ") || "Address not provided"}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <RewardPointsCard points={userProfile.points} />
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8"
      >
        <div className="bg-[#F0EDF9] p-4 sm:p-6 lg:p-8 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h4 className="text-lg font-semibold text-[#6b46c1]">
              Personal Information
            </h4>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  disabled={
                    updateProfileMutation.isPending ||
                    deleteProfileMutation.isPending
                  }
                  className="text-white bg-[#6b46c1] border-[#6b46c1] hover:bg-[#5a3ba3] disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-8 py-2"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCancel();
                    }}
                    disabled={updateProfileMutation.isPending}
                    className="px-4 py-2 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={updateProfileMutation.isPending}
                    className="bg-[#6b46c1] hover:bg-[#5a3ba3] text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updateProfileMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                First Name *
              </label>
              <Input
                {...form.register("firstName")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Last Name *
              </label>
              <Input
                {...form.register("lastName")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Username *
              </label>
              <Input
                {...form.register("userName")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Email Address *
              </label>
              <Input
                {...form.register("email")}
                disabled={!isEditing}
                type="email"
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Phone *
            </label>
            <Input
              {...form.register("phone")}
              disabled={!isEditing}
              type="tel"
              className="border-[#e7e9ee]"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#F0EDF9] p-4 sm:p-6 lg:p-8 rounded-lg">
          <h4 className="text-lg font-semibold text-[#6b46c1] mb-6">Address</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                Country *
              </label>
              <Input
                {...form.register("country")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.country.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                State *
              </label>
              <Input
                {...form.register("state")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                City *
              </label>
              <Input
                {...form.register("city")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
                TAX ID *
              </label>
              <Input
                {...form.register("texId")}
                disabled={!isEditing}
                className="border-[#e7e9ee]"
              />
              {form.formState.errors.texId && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.texId.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4e4e4e] mb-1">
              Address *
            </label>
            <Textarea
              {...form.register("address")}
              disabled={!isEditing}
              className="border-[#e7e9ee] min-h-[80px]"
              placeholder="Enter your full address"
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-red-700 mb-4">
            Danger Zone
          </h4>
          <p className="text-sm text-red-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          {!showDeleteConfirmation ? (
            <Button
              type="button"
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={handleDeleteProfile}
              disabled={deleteProfileMutation.isPending}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-red-700 font-medium">
                Are you absolutely sure you want to delete your account? This
                action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteProfile}
                  disabled={deleteProfileMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleteProfileMutation.isPending
                    ? "Deleting..."
                    : "Yes, Delete My Account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelDelete}
                  disabled={deleteProfileMutation.isPending}
                  className="w-full sm:w-auto bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
