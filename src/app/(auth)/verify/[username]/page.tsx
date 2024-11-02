"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the verification schema
const verifySchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          title: "Verification Failed",
          description: error.response.data.message ?? "An error occurred. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">Verify Your Account</h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} placeholder="Enter your verification code" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { verifySchema } from "@/schemas/verifySchema";
// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { useParams, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// export default function VerifyAccount() {
//   const router = useRouter();
//   const params = useParams<{ username: string }>();
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof verifySchema>>({
//     resolver: zodResolver(verifySchema),
//   });

//   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//     try {
//       const response = await axios.post<ApiResponse>(`/api/verify-code`, {
//         username: params.username,
//         code: data.code,
//       });

//       toast({
//         title: "Success",
//         description: response.data.message,
//       });

//       router.replace("/sign-in");
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: "Verification Failed",
//         description: axiosError.response?.data.message ?? "An error occurred. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify Your Account</h1>
//           <p className="mb-4">Enter the verification code sent to your email</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="code"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Verification Code</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Verify</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }
