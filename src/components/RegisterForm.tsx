"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    alert(JSON.stringify(values));
  }

  return (
    <main className="h-[90vh] flex flex-col lg:flex-row items-center justify-center lg:gap-[120px] gap-8 mt-4 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
      {/* Form Section */}
      <section className="bg-[#1c1c1c] w-full max-w-[450px] lg:max-w-[450px] sm:max-w-[500px] rounded-[24px] p-6 sm:p-8 lg:p-[38px] flex flex-col gap-8 lg:gap-[50px]">
        <div>
          <h2 className="text-[#0288d1] text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
            Welcome ❄️
          </h2>
          <p className="text-[#e0f7fa] text-sm sm:text-base">
            Create your free account now and begin your journey!
          </p>
        </div>

        <Form {...form}>
          <div className="w-full space-y-4 sm:space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e0f7fa] text-sm sm:text-base">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Your name"
                      className="h-11 sm:h-12 rounded-xl bg-white text-black text-sm sm:text-base px-3 border-0 focus-visible:ring-2 focus-visible:ring-[#0288d1]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e0f7fa] text-sm sm:text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-11 sm:h-12 rounded-xl bg-white text-black text-sm sm:text-base px-3 border-0 focus-visible:ring-2 focus-visible:ring-[#0288d1]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e0f7fa] text-sm sm:text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-11 sm:h-12 rounded-xl bg-white text-black text-sm sm:text-base px-3 border-0 focus-visible:ring-2 focus-visible:ring-[#0288d1]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <a
              onClick={() => router.push("/login")}
              className="text-[#e0f7fa] flex justify-end cursor-pointer hover:text-blue-400"
            >
              Already have an account?
            </a>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer h-11 sm:h-12 w-full bg-[#1c1c1c] hover:bg-[#2c2c2c] text-[#0288d1] font-bold text-sm sm:text-base rounded-xl border-[#0288d1] border-2"
                onClick={form.handleSubmit(onSubmit)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </main>
  );
}
