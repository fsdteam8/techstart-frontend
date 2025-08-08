"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CreateUserResponse = {
  success: true;
  code: 200;
  message: string;
  data: {
    accessToken: string;
    user: {
      _id: string;
      email: string;
      role: "user" | "admin"; // add more roles if needed
    };
  };
};

const formSchema = z
  .object({
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    ageVerification: z.boolean().refine((val) => val === true, {
      message: "You must verify your age",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This tells Zod to attach the error to confirmPassword
  });

export default function RegistrationForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: createUser, isPending } = useMutation<CreateUserResponse>({
    mutationKey: ["create-user"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (reqBody: any) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: reqBody.userName,
          email: reqBody.email,
          password: reqBody.password,
          ageVerification: reqBody.ageVerification,
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

      // handle success
      toast.success(data.message);
      router.push(`/otp-verify/${data.data.accessToken}?isNewUser=true`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser(values as any);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  className=" pr-10 h-12 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                  {...field}
                  endIcon={User}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  className=" pr-10 h-12 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                  {...field}
                  endIcon={Mail}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  className=" pr-10 h-12 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm password"
                  {...field}
                  className=" pr-10 h-12 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageVerification"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  You mast be 21 or older to enter this site. Please confirm
                  your age to continue.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-[45px]" disabled={isPending}>
          Register
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#e9e3f6]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-[#6b6b6b]">or</span>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-[#6b6b6b] text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#7d4df3] hover:text-[#6b46c1] font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
}
