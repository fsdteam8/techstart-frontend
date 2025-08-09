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
import { CheckoutSchemaType } from "@/schema/purchase";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<CheckoutSchemaType>;
  onSubmit: (values: CheckoutSchemaType) => void;
}

const CheckoutForm = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-3xl mx-auto py-10"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your full name"
                    className=" h-10 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
                  {...field}
                  className=" h-10 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="email"
                  {...field}
                  className=" h-10 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text"
                  {...field}
                  className=" h-10 bg-[#e9e3f6] border-0 rounded-lg placeholder:text-[#6b6b6b] focus:ring-2 focus:ring-[#7d4df3] focus:bg-white transition-all"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSaved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border-0 p-0">
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className="text-[14px] mt-0 pt-0">
                    Save this information for faster check-out next time
                  </span>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CheckoutForm;
