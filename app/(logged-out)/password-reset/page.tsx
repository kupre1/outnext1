"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { passwordSchema } from "@/validation/passwordSchema";
import { passwordReset } from "./action";
// import { LoginWithCredentials } from "./action";

const formSchema = z.object({
  email: z.string().email(),
});
export default function PasswordReset() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  //   console.log(form);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await passwordReset(data.email);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      {form.formState.isSubmitSuccessful ? (
        <Card>
          <CardHeader>
            <CardTitle>Email sent</CardTitle>
            <CardDescription>
              if you have account, you will recive password reset email at
              {form.getValues("email")}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Password reset</CardTitle>
            <CardDescription>
              Enter your email adrees to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Email Field */}
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="gap-5 flex flex-col"
              >
                <fieldset
                  className="gap-5 flex flex-col"
                  disabled={form.formState.isSubmitting}
                >
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Password Field */}

                  {/* Password Confirm Field */}
                  {form.formState.errors.root && (
                    <FormMessage>
                      {form.formState.errors.root.message}
                    </FormMessage>
                  )}
                  <Button type="submit">Submint</Button>
                </fieldset>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link className="underline" href="/register">
                Register
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link className="underline" href="reset-password">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
