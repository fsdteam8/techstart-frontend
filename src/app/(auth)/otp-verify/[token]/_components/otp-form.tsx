"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "El OTP debe tener 6 dígitos")
    .regex(/^[0-9]+$/, "El OTP debe contener solo números"),
});

type OTPSchemaType = z.infer<typeof otpSchema>;

interface Props {
  token: string;
}

interface ApiRes {
  success: boolean;
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}

interface ResendApiRes {
  success: boolean;
  message: string;
  data: {
    _id: string;
    email: string;
    role: string;
  };
}
const OTPForm = ({ token }: Props) => {
  const [closeTimer, setCloseTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation<ApiRes>({
    mutationKey: ["verify-otp"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (otp: any) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      }).then((res) => res.json()),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push(`/reset-password/${data.data.accessToken}`);
    },
  });

  const { mutate: resetOTPMutate, isPending: isResending } =
    useMutation<ResendApiRes>({
      mutationKey: ["resend-otp"],
      mutationFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend-forgot-otp`,
          {
            method: "POST",
            headers: {
              "content-type": `application/json`,
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
        }

        toast.success(data.message);
        startResendTimer();
      },
    });

  const startResendTimer = () => {
    setCloseTimer(30);
    setResendDisabled(true);
    const timer = setInterval(() => {
      setCloseTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = (values: OTPSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate(values.otp as any);
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 !mt-[36px]"
      >
        <div className="flex justify-between">
          {[...Array(6)].map((_, i) => (
            <Input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              maxLength={1}
              value={form.watch("otp")[i] || ""}
              onChange={(e) => {
                form.clearErrors("otp");
                const value = e.target.value;
                if (!/^[0-9]*$/.test(value)) return;

                const currentOtp = form.getValues("otp");
                const updatedOtp =
                  currentOtp.substring(0, i) +
                  value.slice(-1) +
                  currentOtp.substring(i + 1);

                form.setValue("otp", updatedOtp);

                // Mover el foco al siguiente input
                if (value && i < 5) {
                  const nextInput = document.getElementById(
                    `otp-input-${i + 1}`
                  );
                  if (nextInput) (nextInput as HTMLInputElement).focus();
                }
              }}
              onKeyDown={(e) => {
                // Manejar la tecla Backspace para enfocar el input anterior
                if (e.key === "Backspace" && !form.watch("otp")[i] && i > 0) {
                  const prevInput = document.getElementById(
                    `otp-input-${i - 1}`
                  );
                  if (prevInput) {
                    (prevInput as HTMLInputElement).focus();
                    const currentOtp = form.getValues("otp");
                    const updatedOtp =
                      currentOtp.substring(0, i - 1) +
                      " " + // Limpiar el valor del input anterior si es necesario
                      currentOtp.substring(i);
                    form.setValue("otp", updatedOtp.trim());
                  }
                }
              }}
              className={`!text-[20px] text-[#4E4E4E] !font-medium !leading-[45px] w-[33.83px] 
              lg:w-[53px] h-[70px] lg:h-[70px] text-center text-xl rounded-[6px] lg:rounded-[8px] 
              focus:outline-none  border-[1px] 
              ${
                form.formState.errors.otp
                  ? "bg-red-200/50 border-red-500/50"
                  : form.watch("otp")[i]
                  ? "border-primary "
                  : "border-[#121D42] bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-base text-[#444444] font-normal leading-[19.2px]">
            Didn&apos;t Receive OTP?
          </span>
          <Button
            type="button"
            variant="link"
            className="text-gradient text-base font-normal leading-[19.2px] disabled:opacity-80 disabled:text-gray-500"
            disabled={isPending || resendDisabled}
            onClick={() => resetOTPMutate()}
          >
            {resendDisabled ? (
              `Resend in ${closeTimer}s`
            ) : (
              <span>RESEND OTP {isResending && "..."}</span>
            )}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full min-h-[45px]"
          disabled={isPending || isResending}
        >
          {isPending ? "Please wait..." : "Verify"}
        </Button>
      </form>
    </div>
  );
};

export default OTPForm;
