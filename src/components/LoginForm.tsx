"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import threeCubes from "../assets/images/three-cubes.png";

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
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    alert(JSON.stringify(values));
  }

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center lg:gap-[120px] gap-8 mt-4 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
      {/* Form Section */}
      <section className="bg-[#1c1c1c] w-full max-w-[450px] lg:max-w-[450px] sm:max-w-[500px] rounded-[24px] p-6 sm:p-8 lg:p-[38px] flex flex-col gap-8 lg:gap-[50px]">
        <div>
          <h2 className="text-[#0288d1] text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
            Welcome Back, Please login to your account.
          </h2>
          <p className="text-[#e0f7fa] text-sm sm:text-base">
            Let's get better 1% every day
          </p>
        </div>

        <Form {...form}>
          <div className="w-full space-y-4 sm:space-y-6">
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

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="cursor-pointer h-11 sm:h-12 w-full sm:w-[48%] bg-[#0288d1] hover:bg-[#0277bd] text-[#e0f7fa] font-bold text-sm sm:text-base rounded-xl"
              >
                Sign In
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer h-11 sm:h-12 w-full sm:w-[48%] bg-[#1c1c1c] hover:bg-[#2c2c2c] text-[#0288d1] font-bold text-sm sm:text-base rounded-xl border-[#0288d1] border-2"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Form>
      </section>

      {/* Image - Hidden on mobile and tablet */}
      <div className="hidden lg:block">
        <Image
          src={threeCubes}
          alt="Three Ice Cubes"
          width={400}
          height={400}
          className="rounded-xl shadow-2xl"
        />
      </div>
    </main>
  );
}
