"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { loginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    login(values);
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Form */}

      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access Going travel dashboard
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute top-8 left-2 h-5 w-5 text-muted-foreground" />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="pl-10"
                            placeholder="xyz@example.com"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2 ">
                  <div className="relative ">
                    <Lock className="absolute top-8 left-2 h-5 w-5 text-muted-foreground" />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              disabled={isLoading}
                              className="pr-10 pl-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-6 right-1 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Image/Animation */}
      <div className="hidden w-1/2 bg-blue-500 md:block">
        <div className="relative flex h-full items-center justify-center overflow-hidden">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10 p-8">
            <Image
              src="/logo.svg"
              alt="Login illustration"
              width={600}
              height={600}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
