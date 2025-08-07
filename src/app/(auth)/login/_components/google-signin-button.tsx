"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface GoogleSignInButtonProps {
  disabled?: boolean;
}

export function GoogleSignInButton({ disabled }: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Sign-in Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading}
      className="w-full h-12 border-[#e9e3f6] hover:bg-[#e9e3f6] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-center justify-center space-x-3">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Image src="/icons/google.png" alt="Google" width={20} height={20} />
        </div>
        <span className="text-[#6b6b6b] font-medium">
          {isLoading ? "Connecting..." : "Continue with Google"}
        </span>
      </div>
    </Button>
  );
}
