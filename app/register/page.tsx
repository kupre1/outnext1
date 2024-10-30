"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { registerUser } from "./action";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email(),
    // password: z.string().min(5).max(50),
    // passwordConfrim: z.string(),
  })
  .and(passwordMatchSchema);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfrim: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfrim,
    });

    if (response?.error) {
      form.setError("email", {
        type: "manual",
        message: response?.message,
      });
    }

    console.log(form.formState);
  };

  return (
    <main className="flex justify-center items-center min-h-screen ">
      {form.formState.isSubmitSuccessful ? (
        <Card>
          <CardHeader>
            <CardTitle>Your account has been Created</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>
              <Link href="/login">login to your account</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register fot new accont.</CardDescription>
          </CardHeader>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="gap-5 flex flex-col"
            >
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfrim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confrim</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password Confrim"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Register</Button>
            </form>
          </FormProvider>
        </Card>
      )}
    </main>
  );
}
