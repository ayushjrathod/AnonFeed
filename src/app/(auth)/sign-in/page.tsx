"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const identifier = identifierRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!identifier || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    console.log("Form submitted with data:", { identifier, password });

    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid credentials",
        });
        return;
      }

      if (result?.ok) {
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Welcome Back to AnonFeed</h1>
          <p className="mb-4">Feedbackers sign in here!</p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="identifier">Email/Username</Label>
            <Input id="identifier" type="text" ref={identifierRef} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" ref={passwordRef} />
          </div>
          <Button className="w-full" type="button" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
