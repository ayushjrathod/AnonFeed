"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    console.log("hhi", data);
    try {
      console.log("helooo", data);
      const response = await axios.post("/api/verify-code", {
        username: param.username,
        token: data.token,
      });

      toast({
        title: response.data.message,
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="bg-white w-full max-w-96 p-8 space-y-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify your account</h1>
        <p className="text-center">Enter the code sent to your email</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="token"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter One Time Code</FormLabel>
                  <FormControl>
                    <Input placeholder="token" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
