// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { FormProvider } from "react-hook-form";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
// import { registerUser } from "./action";
// import Link from "next/link";

// const formSchema = z
//   .object({
//     email: z.string().email(),
//     //   password: z.string().min(5).max(50),
//     //   passwordConfirm: z.string(),
//   })
//   .and(passwordMatchSchema);

// export default function RegisterPage() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       passwordConfrim: "",
//     },
//   });

//   //   console.log(form);

//   const handleSubmit = async (data: z.infer<typeof formSchema>) => {
//     const response = await registerUser({
//       email: data.email,
//       password: data.password,
//       passwordConfirm: data.passwordConfrim,
//     });

//     if (response?.error) {
//       form.setError("email", {
//         type: "manual",
//         message: response?.message,
//       });
//     }
//   };

//   return (
//     <main className="flex justify-center items-center min-h-screen">
//       {form.formState.isSubmitSuccessful ? (
//         <Card className="w-[350px]">
//           <CardHeader>
//             <CardTitle>Your account has been Created</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Button className="w-full">
//               <Link href="/login">Login to your account.</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card className="w-[350px]">
//           <CardHeader>
//             <CardTitle>Register</CardTitle>
//             <CardDescription>Register for a new account.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {/* Email Field */}
//             <FormProvider {...form}>
//               <form
//                 onSubmit={form.handleSubmit(handleSubmit)}
//                 className="gap-5 flex flex-col"
//               >
//                 <fieldset
//                   className="gap-5 flex flex-col"
//                   disabled={form.formState.isSubmitting}
//                 >
//                   {/* Email Field */}
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Email" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   {/* Password Field */}
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="password"
//                             {...field}
//                             type="password"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Password Confirm Field */}
//                   <FormField
//                     control={form.control}
//                     name="passwordConfrim"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Confirm Password</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="confirm password"
//                             {...field}
//                             type="password"
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit">Register</Button>
//                 </fieldset>
//               </form>
//             </FormProvider>
//           </CardContent>
//         </Card>
//       )}
//     </main>
//   );
// }

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
    // password: z.string().min(5).max(50), // Uncommented for validation
    // passwordConfirm: z.string(), // Fixed spelling
  })
  .and(passwordMatchSchema);

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "", // Fixed spelling
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm, // Fixed spelling
    });

    if (response?.error) {
      form.setError("email", {
        type: "manual",
        message: response?.message,
      });
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Your account has been created</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Link href="/login">Login to your account.</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Register for a new account.</CardDescription>
          </CardHeader>
          <CardContent>
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Confirm Field */}
                  <FormField
                    control={form.control}
                    name="passwordConfirm" // Fixed spelling
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm Password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Register</Button>
                </fieldset>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link className="underline" href="/login">
                Login
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Forget your password?{" "}
              <Link className="underline" href="reset-password">
                Reset password
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
