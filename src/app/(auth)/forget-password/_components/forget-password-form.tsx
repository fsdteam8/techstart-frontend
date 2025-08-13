"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetReqestForm, ResetRequestFormValues } from "@/schema/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApiRes {
  success: boolean;
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export default function ForgetPasswordForm() {
  const router = useRouter();

  const { mutate: sendOTP, isPending } = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: (email: string) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }).then((res) => res.json()),
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: (data: ApiRes) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      router.push(`/otp-verify/${data.data.accessToken}`);
    },
  });
  // Inicializar el formulario
  const form = useForm<ResetRequestFormValues>({
    resolver: zodResolver(resetReqestForm),
    defaultValues: {
      email: "",
    },
  });

  // Manejar el envío del formulario
  async function onSubmit(data: ResetRequestFormValues) {
    sendOTP(data.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo de correo electrónico */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Email Address"
                    type="email"
                    className="border-primary border-[1px]  min-h-[45px] "
                    startIcon={Mail}
                    disabled={isPending}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de envío */}
        <Button
          type="submit"
          className="w-full  min-h-[45px]"
          disabled={isPending}
        >
          Send OTP
        </Button>
      </form>
    </Form>
  );
}
